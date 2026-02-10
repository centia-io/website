import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Instant SQL and GraphQL API',
    Svg: require('@site/static/img/feature-sql.svg').default,
    description: (
      <>
        Backed by Postgres and exposes a secure SQL and GraphQL API over http.
      </>
    ),
  },
  {
    title: 'Secure by default',
    Svg: require('@site/static/img/feature-security.svg').default,
    description: (
      <>
        OAuth2, rule based security, and rate limiting baked in — ship with confidence.
      </>
    ),
  },
  {
    title: 'Vibe Coding Ready',
    Svg: require('@site/static/img/feature-dev.svg').default,
    description: (
      <>
        Connect your AI agents directly via MCP to build and manage your backend using natural language.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
