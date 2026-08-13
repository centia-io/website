import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {trackCtaClick} from '../../utils/analytics';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Instant Data APIs',
    Svg: require('@site/static/img/feature-sql.svg').default,
    description: (
      <>
        Spatial SQL, GraphQL, and typed JSON-RPC methods over your PostgreSQL schema, plus realtime WebSocket subscriptions on data changes.
      </>
    ),
    link: {
      to: '/docs/intro',
      label: 'Explore the APIs',
      onClick: () => trackCtaClick('cta_api_docs_click', {location: 'home_features'}),
    },
  },
  {
    title: 'Functions in Node.js & Python',
    Svg: require('@site/static/img/feature-dev.svg').default,
    description: (
      <>
        Run your own sandboxed code on demand, on a schedule, or in response to events — with secure callbacks into your data.
      </>
    ),
    link: {
      to: '/docs/functions',
      label: 'See Functions docs',
      onClick: () => trackCtaClick('cta_functions_click', {location: 'home_features'}),
    },
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
    title: 'Built for Geospatial',
    geo: true,
    description: (
      <>
        PostGIS built in. Upload GeoJSON, Shapefile or GeoPackage and get spatial SQL, GraphQL, realtime APIs and OGC WMS/WFS services on your data.
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
    <svg className={styles.featureSvg} viewBox="0 0 200 200" aria-hidden="true">
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
      <div className={styles.featureArt} aria-hidden="true">
        {geo ? <GeoMiniMap /> : <Svg className={styles.featureSvg} />}
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
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
