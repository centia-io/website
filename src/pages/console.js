import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import LoginButton from "../components/loginButton"
import StripePricingTable from "../components/stripePricingTable"
import Creds from "../components/creds"


import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {useAuth} from "../hooks/auth";

export default function Home() {
    const [auth, setAuth] = useAuth()

    return (
        <QueryClientProvider client={new QueryClient()}>

        <Layout>
            <main>

                <div className="container padding-top--md padding-bottom--lg">
                    <div className="row">
                        <div className="col col--6">
                            <LoginButton status={{auth, setAuth}}></LoginButton>
                            <Creds status={{auth, setAuth}}/>
                        </div>
                        <div className="col col--6">
                                <StripePricingTable status={{auth, setAuth}}/>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
        </QueryClientProvider>

    );
}
