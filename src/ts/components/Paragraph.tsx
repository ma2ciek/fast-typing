import * as React from 'react';
import {UserCharacter} from './App';

interface ParagraphProps {
    letterCompleted: UserCharacter[];
    currentLetter: string;
    textNext: string;
}

export default ({ letterCompleted, currentLetter, textNext }: ParagraphProps) => (
    <p className='text' >
        { letterCompleted.map((letter, key) =>
            <span
                className = {'letter ' + (letter.correct ? 'correct' : 'incorrect') }
                key={ key }>
                {letter.char}
            </span>
        ) }
        <span className='current'>{ currentLetter }</span>
        <span>{ textNext }</span>
    </p>
);
