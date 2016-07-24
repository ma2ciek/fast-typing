import VisualKeyboard from './VisualKeyboard';
import TextGenerator from '../services/TextGenerator';
import Statistics from './Statistics';
import * as React from 'react';

interface AppState {
    sentence?: string[];
    currentLetter?: string;
    letterCompleted?: UserCharacter[];
    textNext?: string;
    pressedLetter?: UserCharacter;
    history?: TypingHistory;
}

export interface UserCharacter {
    correct: boolean;
    char: string;
    correctChar?: string;
}

export interface TypingHistory {
    typings: UserCharacter[];
    start: number;
    end: number;
}

export default class App extends React.Component<{}, AppState> {
    private textGenerator = new TextGenerator();

    private keyDown = (e: KeyboardEvent) => {
        if (e.key !== 'Shift') {
            e.preventDefault();
            this.nextLetter(e.key, e.shiftKey);
        }
    };

    private keyUp = (e: KeyboardEvent) => {
        this.setState({ pressedLetter: { char: '', correct: true } });
    }

    public constructor() {
        super();
        this.state = {
            sentence: [],
            textNext: '',
            currentLetter: '',
            letterCompleted: [],
            pressedLetter: { char: '', correct: true },
            history: { start: 0, end: 0, typings: [] },
        };
        this.next();
    }

    public shouldComponentUpdate(nextProps: {}, nextState: AppState) {
        return this.state.textNext !== nextState.textNext || this.state.currentLetter !== nextState.currentLetter;
    }

    private next() {
        this.textGenerator.generate().then((words) => {
            this.reset(words);
        }, err => console.error(err));
    }

    private reset(sentence = this.state.sentence) {
        this.setState({
            sentence: sentence,
            textNext: sentence.join(' ').slice(1),
            currentLetter: sentence[0][0],
            letterCompleted: [],
            pressedLetter: { char: '', correct: true },
            history: { start: 0, end: 0, typings: [] },
        });
        this.on();
    }

    private nextLetter(char: string, shift: boolean) {
        const currentChar = this.state.currentLetter;
        const correct = char === currentChar;
        const letter = this.state.textNext[0];

        if (this.state.letterCompleted.length === 0)
            this.state.history.start = Date.now();

        this.setState({
            letterCompleted: this.state.letterCompleted.concat({ correct, char: currentChar }),
            textNext: this.state.textNext.slice(1),
            currentLetter: letter,
            pressedLetter: { char, correct },
        });

        this.state.history.typings.push({ correct, char, correctChar: currentChar });

        if (!this.state.currentLetter) {
            this.state.history.end = Date.now();
            this.off();
        }
    }

    public render() {
        return (
            <div>
                <button onClick={ () => this.reset() }>Reset</button>
                <button onClick={ () => this.next() }>Next</button>
                <Statistics history={this.state.history} />
                <p className='text' >
                    { this.state.letterCompleted.map((letter, key) =>
                        <span
                            className = {'letter ' + (letter.correct ? 'correct' : 'incorrect') }
                            key={ key }>
                            {letter.char}
                        </span>
                    ) }
                    <span className='current'>{ this.state.currentLetter }</span>
                    <span>{ this.state.textNext }</span>
                </p>
                <VisualKeyboard currentLetter={ this.state.currentLetter } />
            </div>
        );
    }

    private on() {
        window.addEventListener('keydown', this.keyDown);
        window.addEventListener('keyup', this.keyUp);
    }

    private off() {
        window.removeEventListener('keydown', this.keyDown);
        window.removeEventListener('keyup', this.keyUp);
    }
}
