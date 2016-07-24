import * as React from 'react';
import {specialKeys} from '../keyData';

export interface IKeyProps {
    keyName: string;
    active: boolean;
}

export class Key extends React.Component<IKeyProps, {}> {
    private keyCode: number;

    constructor(public props: IKeyProps) {
        super();

        this.setKeyCode();
    }

    private setKeyCode() {
        const keyName = this.props.keyName;
        (specialKeys[keyName] && 'charCode' in specialKeys[keyName]) ?
            this.keyCode = specialKeys[keyName].charCode :
            this.keyCode = keyName.charCodeAt(0);
    }

    public render() {
        return (
            <div
                className={'key ' + (this.props.active ? 'active' : '') }
                style={{ minWidth: this.getWidth() }}>
                { this.props.keyName }
            </div>
        );
    }

    private getWidth() {
        const keyName = this.props.keyName;
        return keyName in specialKeys ? specialKeys[keyName].width * 30 : 30;
    }

    public hasSameKeyCode(keyCode: number) {
        return this.keyCode === keyCode;
    }

    public shouldComponentUpdate(nextProps: IKeyProps) {
        return this.props.active !== nextProps.active;
    }
}

export default Key;
