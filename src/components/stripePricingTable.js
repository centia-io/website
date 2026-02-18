import {Claims} from '@mapcentia/gc2-js-client'

import {useUser} from '../hooks/user'
import styles from './consoleWidgets.module.css'

function StripePricingTable(props) {

    if (props.status.auth === false) {
        return null
    }

    const apiHost = process.env.NODE_ENV === 'production'
        ? 'https://api.centia.io'
        : 'http://localhost:8080'

    let uid
    try {
        const claims = new Claims().get()
        uid = claims.uid
    } catch (e) {
        console.log(e)
    }

    const {data, error, isFetching} = useUser(uid)

    if (isFetching) {
        return <p className={styles.status}>Loading billing data...</p>
    }
    if (error) {
        return <div className="alert alert--danger" role="alert">An error has occurred: {error.message}</div>
    }

    if (!data.properties?.customer) {
        return <div className={styles.billingBox}>
            <h3 className={styles.billingTitle}>Choose a plan</h3>
            <p className={styles.billingText}>Activate a plan to unlock higher usage and billing management.</p>
            <stripe-pricing-table pricing-table-id="prctbl_1Ogw03LJLqYKLZb1nz7x0qAK"
                                  publishable-key="pk_test_51OguhbLJLqYKLZb1l3JIPEKvHPyfMUEGZIl6wgOv99xWQGAN45qD8yWPeMtytdufefnbPMlvjnV4NoePq2Rwyy9B00e2ofCEtA"
                                  client-reference-id={data.name}
                                  customer-email={data.email}
            >
            </stripe-pricing-table>
        </div>
    } else {
        return <form className="mb-0" method="POST" action={`${apiHost}/console/billing`}>
            <input type="hidden" name="id" value={data.properties?.customer}/>
            <button className="button button--outline button--success" type="submit">Manage billing</button>
        </form>
    }
}

export default StripePricingTable
