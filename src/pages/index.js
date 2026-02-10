import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import styles from './index.module.css';

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout title={siteConfig.title} description={siteConfig.tagline}>
            <Head>
                <link rel="canonical" href="https://centia.io/" />
                <link rel="alternate" hrefLang="en" href="https://centia.io/" />
                <link rel="alternate" hrefLang="da-DK" href="https://centia.io/da-DK/" />
                <meta property="og:title" content="Centia.io" />
                <meta property="og:description" content="PostgreSQL/PostGIS backend for developers who love control" />
                <meta property="og:image" content="https://centia.io/img/centia-logo.svg" />
                <meta property="og:url" content="https://centia.io/" />
                <meta name="twitter:card" content="summary_large_image" />

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
            </Head>
            <header className={clsx(styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.ctaButtons}>
                        <Link className="button button--primary button--lg" to="/docs/vibe-coding">
                            Start Vibe Coding
                        </Link>
                        <Link className="button button--primary button--lg" to="/console">
                            Open Console
                        </Link>
                        <Link className="button button--primary button--lg" to="/docs/intro">
                            Read the Docs
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}
