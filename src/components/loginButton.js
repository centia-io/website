import {CodeFlow} from '@mapcentia/gc2-js-client'
import {useEffect, useMemo} from "react";

function LoginButton(props) {
    const {auth, setAuth} = props.status;

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

    const codeFlow = useMemo(() => {
        if (typeof window === 'undefined') {
            return null;
        }
        return new CodeFlow(options)
    }, [options.clientId, options.host, options.redirectUri])

    const signInHandler = (e) => {
        if (!codeFlow) return;
        codeFlow.signIn()
    }
    const signOutHandler = (e) => {
        if (!codeFlow) return;
        setAuth(false)
        codeFlow.signOut()
    }

    useEffect(() => {
        if (!codeFlow) return;

        codeFlow.redirectHandle().then((isSignedIn) => {
            setAuth(isSignedIn)
        }).catch((err) => console.info(err))

        let params = new URLSearchParams(window.location.search)
        let r = params.get("r")
        if (r !== null) {
            codeFlow.signIn()
        }
    }, [codeFlow, setAuth])

    if (auth)
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
