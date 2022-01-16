import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export default ({ onSignedIn, isSignIn}) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onNavigate: ({ pathname: nextPathname}) => {
                const { pathname } = history.location;
                if(pathname !== nextPathname) {
                    history.push(nextPathname)
                }
            }, 
            inititialPath: history.location.pathname,
            onSignIn: () => {
                // console.log('user signed in')
                onSignedIn()
            }
        });

        history.listen(onParentNavigate)

    },[])

    return <div ref = {ref} />
}