import VisualKeyboard from './VisualKeyboard';
import TextGenerator from '../services/TextGenerator';
import Statistics from './Statistics';
import Paragraph from './Paragraph';
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
        const {letterCompleted, currentLetter, textNext} = this.state;

        return (
            <div>
                <span className='icon' onClick={ () => this.reset() } title='reset' >
                    <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z' />
                        <path d='M0 0h24v24H0z' fill='none'/>
                    </svg>
                </span>
                <span className='icon' onClick={ () => this.next() } title='next' >
                    <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z'/>
                        <path d='M0-.25h24v24H0z' fill='none' />
                    </svg>
                </span>
                <Statistics history={this.state.history} />

                <Paragraph letterCompleted={ letterCompleted }
                    currentLetter={ currentLetter }
                    textNext = { textNext }/>

                <VisualKeyboard currentLetter={ currentLetter } />
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

