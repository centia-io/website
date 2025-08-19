import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={clsx('hero shadow--lw', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.ctaButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Read the Docs
            </Link>
            <Link className="button button--secondary button--outline button--lg" to="/console">
              Open Console
            </Link>
          </div>
          <p className="margin-top--sm">
            <a href="https://api.centia.io/swagger-ui/index.html">Explore the OpenAPI spec</a>
          </p>
        </div>
        <img className={styles.heroArt} src={useBaseUrl('/img/hero-illustration.svg')} alt="" aria-hidden="true" />
      </header>

      <main>
        <section className="container margin-vert--lg">
          <div className="row">
            <div className="col col--6">
              <h2>Query your data over HTTP</h2>
              <p>
                Use the SQL endpoint to select, insert, update, and delete. Secure by default with OAuth2/OIDC and
                row-level security.
              </p>
            </div>
            <div className="col col--6">
              <CodeBlock language="bash">{`curl -X POST https://api.centia.io/sql \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"sql": "select * from my_table limit 3"}'`}</CodeBlock>
            </div>
          </div>
        </section>

        <HomepageFeatures />
      </main>
    </Layout>
  );
}
