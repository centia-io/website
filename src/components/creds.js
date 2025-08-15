import {Claims, Status} from '@mapcentia/gc2-js-client'
import {useRef, useState} from 'react'

function Creds(props) {
    if (props.status.auth === false) {
        return null
    }

    let email = ''
    let uid = ''
    let accessToken = ''
    let refreshToken = ''
    try {
        const claims = new Claims().get()
        const tokens = new Status().getTokens()
        email = claims?.email ?? ''
        uid = claims?.uid ?? ''
        accessToken = tokens?.accessToken ?? ''
        refreshToken = tokens?.refreshToken ?? ''
    } catch (e) {
        console.log(e)
    }

    const [copied, setCopied] = useState(false)
    const textRef = useRef(null)

    async function copyToClipboard() {
        try {
            const text = accessToken || ''
            if (!text) return
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(text)
            } else {
                // Fallback
                const el = textRef.current
                if (!el) return
                el.removeAttribute('readOnly')
                el.select()
                document.execCommand('copy')
                el.setAttribute('readOnly', true)
                window.getSelection()?.removeAllRanges()
            }
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1500)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="card margin-top--md">
                <div className="card__header">
                    <h3 className="margin-bottom--none">Credentials</h3>
                </div>
                <div className="card__body">
                    <div className="margin-bottom--sm">
                        <strong>UID:</strong> <span className="margin-left--xs">{uid}</span>
                    </div>
                    <div className="margin-bottom--md">
                        <strong>Email:</strong> <span className="margin-left--xs">{email}</span>
                    </div>

                    <label htmlFor="accessToken" className="margin-bottom--xs">Access token</label>
                    <div
                        className="margin-bottom--sm"
                        style={{display: 'flex', gap: '0.5rem', alignItems: 'flex-start'}}
                    >
                        <input
                            id="accessToken"
                            ref={textRef}
                            readOnly
                            value={accessToken}
                            className="flex-grow"
                            style={{
                                flex: 1,
                                width: '100%',
                                fontFamily: 'var(--ifm-font-family-monospace, monospace)',
                                backgroundColor: 'var(--ifm-color-emphasis-100)',
                                border: '1px solid var(--ifm-color-emphasis-300)',
                                borderRadius: 'var(--ifm-global-radius)',
                                padding: '0.5rem',
                                resize: 'vertical'
                            }}
                            placeholder="No access token available"
                        />
                        <button
                            type="button"
                            className={`button button--sm ${copied ? 'button--success' : 'button--secondary'}`}
                            onClick={copyToClipboard}
                            aria-live="polite"
                            title="Copy to clipboard"
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>

                    <small>
                        Keep this token secret. You can regenerate it from your account if needed.
                    </small>
                </div>
            </div>
        </>
    )
}

export default Creds
