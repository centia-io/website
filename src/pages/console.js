import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import LoginButton from "../components/loginButton";
import Creds from "../components/creds";
import Stats from "../components/stats";
import {trackCtaClick} from "../utils/analytics";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useAuth} from "../hooks/auth";

export default function Home() {
    const [auth, setAuth] = useAuth();

    return (
        <QueryClientProvider client={new QueryClient()}>
            <Layout>
                <main>
                    <section className="container padding-top--md padding-bottom--lg">
                        <div className="row">
                            <div className="col col--6">
                                <LoginButton status={{auth, setAuth}} />
                                <Creds status={{auth, setAuth}} />
                                <Stats status={{auth, setAuth}} />
                            </div>
                        </div>
                    </section>
                    <section className="container margin-vert--lg">
                        <div className="row">
                            <div className="col col--3">
                                <div className="card">
                                    <div className="card__header"><h3>Start</h3></div>
                                    <div className="card__body">Create a backend and your first schema & table.</div>
                                    <div className="card__footer"><Link className="button button--sm button--primary" to="/docs/start" onClick={() => trackCtaClick('cta_console_start_guide_click', {location: 'console_card_start'})}>Open guide</Link></div>
                                </div>
                            </div>
                            <div className="col col--3">
                                <div className="card">
                                    <div className="card__header"><h3>Vibe coding</h3></div>
                                    <div className="card__body">Connect your AI agents directly via MCP to start building</div>
                                    <div className="card__footer"><Link className="button button--sm button--primary" to="/docs/vibe-coding" onClick={() => trackCtaClick('cta_console_vibe_coding_click', {location: 'console_card_vibe'})}>Get started.</Link></div>
                                </div>
                            </div>
                            <div className="col col--3">
                                <div className="card">
                                    <div className="card__header"><h3>Realtime</h3></div>
                                    <div className="card__body">Subscribe to changes for reactive UIs.</div>
                                    <div className="card__footer"><Link className="button button--sm button--primary" to="/docs/realtime" onClick={() => trackCtaClick('cta_console_realtime_click', {location: 'console_card_realtime'})}>Learn more</Link></div>
                                </div>
                            </div>
                            <div className="col col--3">
                                <div className="card">
                                    <div className="card__header"><h3>OAuth</h3></div>
                                    <div className="card__body">Authenticate users and secure access.</div>
                                    <div className="card__footer"><Link className="button button--sm button--primary" to="/docs/oauth" onClick={() => trackCtaClick('cta_console_oauth_click', {location: 'console_card_oauth'})}>Set up auth</Link></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </Layout>
        </QueryClientProvider>
    );
}
