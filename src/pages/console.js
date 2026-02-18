import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import LoginButton from "../components/loginButton";
import Creds from "../components/creds";
import Stats from "../components/stats";
import {trackCtaClick} from "../utils/analytics";
import styles from "./console.module.css";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useAuth} from "../hooks/auth";
import StripePricingTable from "../components/stripePricingTable";

const queryClient = new QueryClient();

export default function Home() {
    const [auth, setAuth] = useAuth();

    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <main>
                    <section className={`container ${styles.headerSection}`}>
                        <p className={styles.kicker}>Developer Console</p>
                        <h1 className={styles.title}>Manage your account and environment</h1>
                        <p className={styles.subtitle}>
                            Sign in to view credentials, usage stats, and billing controls in one place.
                        </p>
                    </section>

                    <section className={`container ${styles.workspaceSection}`}>
                        {/*<div className={styles.workspaceGrid}>*/}
                        <div className={styles.primaryPanel}>
                            <div className={styles.loginRow}>
                                <LoginButton status={{auth, setAuth}}/>
                            </div>
                            <Creds status={{auth, setAuth}}/>
                            <Stats status={{auth, setAuth}}/>
                        </div>
                        {/*            <div className={styles.secondaryPanel}>
                                <h2 className={styles.panelTitle}>Billing</h2>
                                <p className={styles.panelBody}>
                                    Choose a plan or manage your existing subscription.
                                </p>
                                <StripePricingTable status={{auth, setAuth}}/>
                            </div>*/}
                        {/*</div>*/}
                    </section>

                    <section className={`container ${styles.guidesSection}`}>
                        <h2 className={styles.guidesTitle}>Guides</h2>
                        <div className={styles.guidesGrid}>
                            <div className={styles.guideCard}>
                                <h3>Start</h3>
                                <p>Create a backend and your first schema and table.</p>
                                <div>
                                    <Link className="button button--sm button--primary" to="/docs/start"
                                          onClick={() => trackCtaClick('cta_console_start_guide_click', {location: 'console_card_start'})}>Open
                                        guide</Link>
                                </div>
                            </div>
                            <div className={styles.guideCard}>
                                <h3>Vibe coding</h3>
                                <p>Connect your AI agents directly via MCP to start building.</p>
                                <div>
                                    <Link className="button button--sm button--primary" to="/docs/vibe-coding"
                                          onClick={() => trackCtaClick('cta_console_vibe_coding_click', {location: 'console_card_vibe'})}>Get
                                        started</Link>
                                </div>
                            </div>
                            <div className={styles.guideCard}>
                                <h3>Realtime</h3>
                                <p>Subscribe to changes for reactive user interfaces.</p>
                                <div>
                                    <Link className="button button--sm button--primary" to="/docs/realtime"
                                          onClick={() => trackCtaClick('cta_console_realtime_click', {location: 'console_card_realtime'})}>Learn
                                        more</Link>
                                </div>
                            </div>
                            <div className={styles.guideCard}>
                                <h3>OAuth</h3>
                                <p>Authenticate users and secure access.</p>
                                <div>
                                    <Link className="button button--sm button--primary" to="/docs/oauth"
                                          onClick={() => trackCtaClick('cta_console_oauth_click', {location: 'console_card_oauth'})}>Set
                                        up auth</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </Layout>
        </QueryClientProvider>
    );
}
