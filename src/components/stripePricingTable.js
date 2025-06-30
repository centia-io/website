import {Claims} from '@mapcentia/gc2-js-client'

import {useUser} from '../hooks/user'

function StripePricingTable(props) {

    if (props.status.auth === false) {
        return null
    }

    let email
    let uid
    try {
        const claims = new Claims().get()
        uid = claims.uid
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

    if (!data.properties?.customer) {
        return <>
            <h2>Choose a plan</h2>
            <stripe-pricing-table pricing-table-id="prctbl_1Ogw03LJLqYKLZb1nz7x0qAK"
                                  publishable-key="pk_test_51OguhbLJLqYKLZb1l3JIPEKvHPyfMUEGZIl6wgOv99xWQGAN45qD8yWPeMtytdufefnbPMlvjnV4NoePq2Rwyy9B00e2ofCEtA"
                                  client-reference-id={data.name}
                                  customer-email={data.email}
            >
            </stripe-pricing-table>
        </>
    } else {
        return <form className="mb-0" method="POST" action="http://localhost:8080/console/billing">
            <input type="hidden" name="id" value={data.properties?.customer}/>
            <button className="button button--outline button--success" type="submit">Manage billing</button>
        </form>
    }
}

export default StripePricingTable
