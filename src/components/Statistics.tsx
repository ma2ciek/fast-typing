import * as React from 'react';
import {TypingHistory} from './App';

interface StatisticsProps {
    history: TypingHistory;
}

export default class Statistics extends React.Component<StatisticsProps, {}> {
    public render() {
        return (
            <div className='statistics'>
                <span className='time'>Time: { this.getTime() }</span>
                <span className='fails'>Fails: { this.getResult() }</span>
            </div>
        );
    }

    public componentDidMount() {
        this.timer();
    }

    private timer() {
        const {start, end} = this.props.history;
        if (end)
            return;

        requestAnimationFrame(() => {
            if (start) this.forceUpdate();
            this.timer();
        });
    }

    private getResult() {
        return this.props.history.typings.filter(t => !t.correct).length;
    }

    private getTime() {
        const {start, end} = this.props.history;

        return (end || !start) ?
            this.format(end - start) :
            this.format(Date.now() - start);
    }

    private format(ms: number) {
        const minutes = ms / 60000 | 0;
        const seconds = (ms / 1000) % 60;

        return minutes + ':' + seconds.toFixed(1);
    }
}
