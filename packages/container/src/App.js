import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Progress from './components/Progress';

// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';
import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';


const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
})


export default () => {
    const [isSignIn, setIsSignedIn] = useState(false);

    const onSignOut = () => {
        setIsSignedIn(false)
    }

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>

                <div>
                    <Header isSignIn={isSignIn} onSignOut={onSignOut}  />
                    <Suspense fallback={<div>Laoding..</div>}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignedIn = {() => setIsSignedIn(true)} isSignIn={isSignIn}  />
                            </Route>
                            <Route path ="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>

        </BrowserRouter>
    )
}