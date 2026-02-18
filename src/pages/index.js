import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Head from '@docusaurus/Head';
import {trackCtaClick} from '../utils/analytics';
import styles from './index.module.css';


export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    const pageTitle = 'Postgres BaaS for Cloud and Self-Hosting';
    const pageDescription = 'Build on managed Centia.io Cloud or self-host with Docker. Get PostgreSQL/PostGIS, OAuth, realtime, and SDKs built for developers and AI agents.';
    return (
        <Layout title={pageTitle} description={pageDescription}>
            <Head>
                <link rel="canonical" href="https://centia.io/" />
                <link rel="alternate" hrefLang="en" href="https://centia.io/" />
                <meta property="og:title" content="Centia.io | Postgres BaaS for Cloud and Self-Hosting" />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content="https://centia.io/img/centia-logo.svg" />
                <meta property="og:url" content="https://centia.io/" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Centia.io | Postgres BaaS for Cloud and Self-Hosting" />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="keywords" content="Postgres BaaS, PostgreSQL backend, self-hosted backend, managed backend, PostGIS, realtime API, OAuth backend" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        name: 'Centia.io',
                        url: 'https://centia.io/',
                        logo: 'https://centia.io/img/centia-logo.svg',
                        sameAs: [
                            'https://github.com/centia-io/',
                            'https://stackoverflow.com/questions/tagged/centia.io'
                        ]
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'Centia.io',
                        applicationCategory: 'DeveloperApplication',
                        operatingSystem: 'Web',
                        description: pageDescription,
                        url: 'https://centia.io/',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                    })}
                </script>
            </Head>
            <div className="front-page">
            <header className={clsx(styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">The Postgres backend for teams that want to launch fast in cloud or self-host with full control.</p>
                    <div className={styles.ctaButtons}>
                        <Link
                            className="button button--primary button--lg"
                            to="/console"
                            onClick={() => trackCtaClick('cta_cloud_start_click', {location: 'home_hero'})}
                        >
                            Start in Centia Cloud
                        </Link>
                        <Link
                            className="button button--secondary button--lg"
                            to="/docs/opensource"
                            onClick={() => trackCtaClick('cta_self_host_click', {location: 'home_hero'})}
                        >
                            Self-host with Docker
                        </Link>
                        <Link
                            className="button button--primary button--lg"
                            to="/docs/start"
                            onClick={() => trackCtaClick('cta_docs_start_click', {location: 'home_hero'})}
                        >
                            Read the Docs
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <HomepageFeatures/>
            </main>
            </div>
        </Layout>
    );
}
