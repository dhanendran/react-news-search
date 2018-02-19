import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewsSearch, {NewsCard} from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NewsSearch />, document.getElementById('container'));
registerServiceWorker();
