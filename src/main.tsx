import * as ReactDOM from 'react-dom';
import * as React from 'react';
import App from './components/App';

window.addEventListener('load', (e: Event) => {
    ReactDOM.render(<App />, document.querySelector('main'));
});
