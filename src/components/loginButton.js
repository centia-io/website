import {CodeFlow} from '@mapcentia/gc2-js-client'
import {useEffect} from "react";

function LoginButton(props) {
    const codeFlow = new CodeFlow({
       redirectUri: 'https://centia.io/console/',
        //redirectUri: 'http://localhost:4000/console/',
        clientId: 'centia',
       host: 'https://api.centia.io',
    // host: 'http://localhost:8080',
    })
    const signInHandler = (e) => {
        codeFlow.signIn()
    }
    const signOutHandler = (e) => {
        props.status.setAuth(false)
        codeFlow.signOut()
    }

    codeFlow.redirectHandle().then((isSignedIn) => {
        props.status.setAuth(isSignedIn)
    }).catch((err) => console.info(err))

    useEffect(() => {
        let params = new URLSearchParams(document.location.search)
        let r = params.get("r")
        if (r !== null) {
            codeFlow.signIn()
        }
    }, [])

    if (props.status.auth)
        return (
            <>
                <button className="button button--outline button--primary" onClick={signOutHandler}>
                    Sign out
                </button>
            </>
        )
    else
        return (
            <>
                <a href="https://api.centia.io/signup?redirect_uri=https://centia.io/console?r">Sign
                    up for
                    an account</a>
                <span className="margin-left--md">or</span>
                <button className="button button--primary margin-left--md" onClick={signInHandler}>Sign in</button>
            </>
        )

}

export default LoginButton;
