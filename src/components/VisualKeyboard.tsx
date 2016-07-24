import {Key, IKeyProps} from './Key';
import * as React from 'react';
import {keyboard, specialKeys} from '../keyData';

interface ICollectionCallback<T> {
    (element: T, colIndex: number, rowIndex: number): void;
}

export interface VisaulKeyboardState {
    keys: IKeyInitialState[][];
}

export interface VisualKeyboardProps {
    currentLetter: string;
}

export interface IKeyInitialState {
    props: IKeyProps;
    state: {};
}

export default class VisualKeyboard extends React.Component<VisualKeyboardProps, VisaulKeyboardState> {
    public render() {
        return (
            <div className='keyboard'>
                { keyboard.map((row, i) => this.renderRow(row, i)) }
            </div>
        );
    }

    public renderRow(row: string[], i: number) {
        return (
            <div key={i} className='row'>
                { row.map((name, j) => this.renderKey(name, i + ':' + j)) }
            </div>
        );
    }

    public renderKey(name: string, key: string) {
        return (<Key
            active={ this.isActive(name) }
            key={ key }
            keyName={ name } />
        );
    }

    private isActive(name: string) {
        const {currentLetter} = this.props;
        if (typeof currentLetter !== 'string')
            return false;

        return (name in specialKeys) ?
            String.fromCharCode(specialKeys[name].charCode) === currentLetter.toUpperCase() :
            currentLetter.toUpperCase() === name;
    }
}
