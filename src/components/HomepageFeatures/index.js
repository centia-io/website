import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {trackCtaClick} from '../../utils/analytics';
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
  {
    title: 'Built for Geospatial',
    geo: true,
    description: (
      <>
        PostGIS built in. Upload GeoJSON, Shapefile or GeoPackage and get spatial SQL, GraphQL and realtime APIs on your data.
      </>
    ),
    link: {
      to: '/geospatial',
      label: 'From spatial data to API',
      onClick: () => trackCtaClick('cta_geospatial_click', {location: 'home_features'}),
    },
  },
];

function GeoMiniMap() {
  return (
    <svg className={styles.featureSvg} viewBox="0 0 200 200" role="img" aria-hidden="true">
      <g className={styles.geoGrid}>
        {[50, 100, 150].map((p) => (
          <line key={`v${p}`} x1={p} y1="0" x2={p} y2="200" />
        ))}
        {[50, 100, 150].map((p) => (
          <line key={`h${p}`} x1="0" y1={p} x2="200" y2={p} />
        ))}
      </g>
      <g className={styles.geoPolygons}>
        <polygon points="28,118 70,88 106,110 96,152 44,160" />
        <polygon points="120,38 166,28 186,70 150,96 118,74" />
      </g>
      <circle className={styles.geoRadius} cx="100" cy="102" r="48" />
      <circle className={styles.geoPoint} cx="100" cy="102" r="4.5" />
      <g className={styles.geoFeaturePoints}>
        <circle cx="64" cy="126" r="3" />
        <circle cx="148" cy="60" r="3" />
        <circle cx="126" cy="138" r="3" />
      </g>
    </svg>
  );
}

function Feature({Svg, geo, title, description, link}) {
  return (
    <div className={clsx(styles.featureCard, geo && styles.featureCardGeo)}>
      <div className={styles.featureArt}>
        {geo ? <GeoMiniMap /> : <Svg className={styles.featureSvg} role="img" />}
      </div>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
      {link && (
        <Link to={link.to} className={styles.featureLink} onClick={link.onClick}>
          {link.label} →
        </Link>
      )}
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
