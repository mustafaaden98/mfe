import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onNavigate, defaultHistory, inititialPath, onSignIn }) => {
    const history =   defaultHistory || createMemoryHistory({
        initialEntries: [inititialPath]
    });

    onNavigate && history.listen(onNavigate)

    ReactDOM.render(
        <App history={history} onSignIn={onSignIn} />,
        el
    )
    return {
        onParentNavigate({ pathname: nextPathname}) {
            const { pathname } = history.location;
            if(nextPathname !== pathname){
                history.push(nextPathname)
            }
        }
    }
}


if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');
    console.log(devRoot)
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory()})
    }
}

export { mount }