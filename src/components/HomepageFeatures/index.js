import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Instant SQL API',
    Svg: require('@site/static/img/feature-sql.svg').default,
    description: (
      <>
        Backed by Postgres and exposes a secure, scalable SQL-over-HTTP.
      </>
    ),
  },
  {
    title: 'Secure by default',
    Svg: require('@site/static/img/feature-security.svg').default,
    description: (
      <>
        OAuth2, row-level security, and rate limiting baked in — ship with confidence.
      </>
    ),
  },
  {
    title: 'Built for developers',
    Svg: require('@site/static/img/feature-dev.svg').default,
    description: (
      <>
        Clean OpenAPI schema, intuitive SDKs, and a friendly CLI to manage your data.
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
