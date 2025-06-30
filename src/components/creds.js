import {Claims, Status} from '@mapcentia/gc2-js-client'
import {useUser} from '../hooks/user'

function Creds(props) {

    if (props.status.auth === false) {
        return null
    }

    let email
    let uid
    let accessToken
    let refreshToken
    try {
        const claims = new Claims().get()
        const tokens = new Status().getTokens()
        email = claims.email
        uid = claims.uid
        accessToken = tokens.accessToken
        refreshToken = tokens.refreshToken

    } catch (e) {
        console.log(e)
    }

    const {data, error, isFetching} = useUser(uid)

    if (isFetching) {
        return 'Loading...'
    }
    if (error) {
        return 'An error has occurred: ' + error.message
    }

    return <>
        <div>{uid}</div>
        <div>{email}</div>
        <div><textarea>{accessToken}</textarea></div>
        <div><textarea>{refreshToken}</textarea></div>
    </>

}

export default Creds
