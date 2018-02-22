import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewsSearch, {NewsCard, Weather} from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NewsSearch />, document.getElementById('container'));
ReactDOM.render(<Weather />, document.getElementById('weather'));
registerServiceWorker();
