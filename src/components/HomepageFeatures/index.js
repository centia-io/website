import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Choose Cloud or Self-Host',
    Svg: require('@site/static/img/feature-sql.svg').default,
    description: (
      <>
        Start in managed Centia Cloud in minutes, or self-host with Docker when compliance or data residency requires it.
      </>
    ),
  },
  {
    title: 'Production Security by Default',
    Svg: require('@site/static/img/feature-security.svg').default,
    description: (
      <>
        OAuth2, rule-based access, and rate limiting are built in so you can ship faster without re-building backend security.
      </>
    ),
  },
  {
    title: 'Built for AI-Assisted Development',
    Svg: require('@site/static/img/feature-dev.svg').default,
    description: (
      <>
        Connect agents through MCP to model schemas, run backend workflows, and iterate quickly from natural language prompts.
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
