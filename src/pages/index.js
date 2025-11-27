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
            <header className={clsx('hero shadow--lw', styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.ctaButtons}>
                        <Link className="button button--primary button--lg" to="/docs/intro">
                            Read the Docs
                        </Link>
                    </div>
                </div>
                <img className={styles.heroArt} src={useBaseUrl('/img/hero-illustration.svg')} alt=""
                     aria-hidden="true"/>
            </header>

            <main>
                <section className="container margin-vert--lg">
                    <div className="row">
                        <div className="col col--6">
                            <h2>Query your data over HTTP or WebSocket</h2>
                            <p>
                                Use the SQL endpoint or WebSocket to select, insert, update, and delete. Secure by
                                default with OAuth2 and
                                row-level security.
                            </p>
                        </div>
                        <div className="col col--6">
                            <CodeBlock language="json">{`{
  "q": "select id, name from rockhall where name = :name",
  "params": { "name": "Red Hot Chili Peppers" },
  "output_format": "json"
  "id": "1"
}`}</CodeBlock>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col--6">
                            <h2>Wrap your SQL statements inside JSON-RPC methods</h2>
                            <p>
                                Create JSON-RPC methods along with optional instructions on how to
                                interpret and format the data types.
                            </p>
                        </div>
                        <div className="col col--6">
                            <CodeBlock language="json">{`{
  "jsonrpc": "2.0",
  "method": "getFromRockHall",
  "params": { "name": "Red Hot Chili Peppers" },
  "id": 1
}`}</CodeBlock>
                        </div>
                    </div>
                </section>

                <HomepageFeatures/>
            </main>
        </Layout>
    );
}
