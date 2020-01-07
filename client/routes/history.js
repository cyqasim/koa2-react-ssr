let history = null;

if (typeof document !== 'undefined') {
    const createBrowserHistory = require('history').createBrowserHistory;

    history = createBrowserHistory();
}

export default history;
