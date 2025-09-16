import {CodeFlow} from '@mapcentia/gc2-js-client'
import {useEffect} from "react";

function LoginButton(props) {

    let options;

    if (process.env.NODE_ENV === 'production') {
        options = {
            redirectUri: 'https://centia.io/console/',
            clientId: 'centia',
            host: 'https://api.centia.io',
        }
    } else {
        options = {
            redirectUri: 'http://localhost:4000/console/',
            clientId: 'centia',
            host: 'http://localhost:8080',
        }
    }

    const codeFlow = new CodeFlow(options)
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
        if (process.env.NODE_ENV === 'production') {
            return (
                <>
                    <a className="button button--primary margin-left--md" href="https://api.centia.io/signup?redirect_uri=https://centia.io/console?r">Sign
                        up for
                        an account</a>
                    <span className="margin-left--md">or</span>
                    <button className="button button--secondary margin-left--md" onClick={signInHandler}>Sign in</button>
                </>
            )
        }
        return (
            <>
                <a className="button button--primary margin-left--md" href="http://localhost:8080/signup?redirect_uri=http://localhost:4000/console?r">Sign
                    up for
                    an account</a>
                <span className="margin-left--md">or</span>
                <button className="button button--secondary margin-left--md" onClick={signInHandler}>Sign in</button>
            </>
        )

}

export default LoginButton;
