import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import {trackCtaClick} from '../utils/analytics';
import styles from './geospatial.module.css';

const pageTitle = 'Geospatial BaaS — Managed PostGIS & Instant APIs';
const pageDescription =
    'Upload GeoJSON, Shapefile or GeoPackage and get SQL, GraphQL, realtime APIs and OGC WMS/WFS services on a managed PostGIS database. Built for geospatial developers.';

const formats = ['GeoJSON', 'Shapefile', 'GeoPackage', 'CSV', 'GML'];

const steps = [
    {
        marker: '01',
        title: 'Upload your data',
        description:
            'CSV, GeoJSON, Shapefile, GeoPackage or GML. Centia creates PostGIS tables automatically — projection handled.',
        link: {to: '/docs/import', label: 'File import'},
    },
    {
        marker: '02',
        title: 'Get instant APIs',
        description:
            'Query with parameterized SQL over REST or WebSocket, auto-generated GraphQL — and serve every layer as OGC WMS/WFS.',
        link: {to: '/docs/statement', label: 'SQL API'},
    },
    {
        marker: '03',
        title: 'Build your app',
        description:
            'TypeScript SDK with OAuth helpers, realtime subscriptions with server-side filtering, and fine-grained access control.',
        link: {to: '/docs/sdk', label: 'SDK'},
    },
];

const features = [
    {
        icon: '⌖',
        title: 'PostGIS built in',
        description:
            'Full spatial SQL: ST_Intersects, ST_DWithin, transformations, the lot. No extensions to install.',
    },
    {
        icon: '⛁',
        title: 'Managed PostGIS, or self-hosted',
        description: 'Run on Centia’s cloud or deploy yourself with Docker.',
    },
    {
        icon: '▦',
        title: 'OGC WMS & WFS built in',
        description:
            'Every layer is served as WMS and WFS — connect QGIS, OpenLayers or Leaflet, and edit features via WFS-T.',
    },
    {
        icon: '⬡',
        title: 'GraphQL, auto-generated',
        description: 'Queries, mutations and subscriptions derived from your schema.',
    },
    {
        icon: '⇄',
        title: 'Realtime over WebSocket',
        description: 'Subscribe to table changes with server-side filtering (shapes).',
    },
    {
        icon: '⚿',
        title: 'Auth that scales down',
        description:
            'OAuth 2.0 (PKCE, password, device flows), sub-users, table-level privileges and SQL rules.',
    },
    {
        icon: '✳',
        title: 'AI-agent ready',
        description: 'Official MCP server lets AI agents manage your backend directly.',
    },
    {
        icon: '◍',
        title: 'Open source roots',
        description:
            'Built on Geocloud2 (AGPLv3) by MapCentia, with 10+ years of geospatial domain expertise.',
    },
];

const useCases = [
    {
        title: 'Web maps with live data',
        description: 'Realtime layers without building a sync pipeline.',
    },
    {
        title: 'Field data collection',
        description: 'Upload from the field, query from the office.',
    },
    {
        title: 'Open data portals',
        description: 'Publish spatial datasets as queryable APIs.',
    },
    {
        title: 'GIS + AI workflows',
        description: 'Let agents query and manage spatial data via MCP.',
    },
    {
        title: 'Desktop GIS integration',
        description: 'Connect QGIS directly over WMS/WFS and edit with WFS-T.',
    },
];

const ogcExample = `# Render a styled map image (WMS GetMap)
https://api.centia.io/api/v4/ows/schema/parks
  ?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap
  &LAYERS=parks.areas&SRS=EPSG:3857
  &BBOX=1204164,7485240,1259200,7534200
  &WIDTH=1024&HEIGHT=768&FORMAT=image/png

# Fetch the vector features (WFS GetFeature)
https://api.centia.io/api/v4/wfs/schema/parks
  ?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature
  &TYPENAME=areas&SRSNAME=EPSG:4326`;

const sqlExample = `-- Query your uploaded data with full PostGIS power
SELECT name, ST_AsGeoJSON(geom) AS geometry
FROM parks
WHERE ST_DWithin(
  geom::geography,
  ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
  1000
)`;

function HeroMap() {
    return (
        <div className={styles.heroArt} aria-hidden="true">
            <svg className={styles.heroMap} viewBox="0 0 480 360" role="presentation">
                {/* graticule */}
                <g className={styles.graticule}>
                    {[60, 120, 180, 240, 300, 360, 420].map((x) => (
                        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="360" />
                    ))}
                    {[60, 120, 180, 240, 300].map((y) => (
                        <line key={`h${y}`} x1="0" y1={y} x2="480" y2={y} />
                    ))}
                </g>
                {/* park polygons */}
                <g className={styles.polygons}>
                    <polygon points="48,210 112,168 176,196 162,268 84,282" />
                    <polygon points="262,52 348,38 396,96 342,150 270,128" />
                    <polygon points="330,220 414,196 452,260 398,318 326,296" />
                </g>
                {/* ST_DWithin radius */}
                <circle className={styles.queryRadius} cx="216" cy="172" r="92" />
                <circle className={styles.queryPoint} cx="216" cy="172" r="6" />
                {/* feature points */}
                <g className={styles.points}>
                    <circle cx="140" cy="226" r="4" />
                    <circle cx="296" cy="108" r="4" />
                    <circle cx="252" cy="218" r="4" />
                    <circle cx="372" cy="252" r="4" />
                    <circle cx="96" cy="96" r="4" />
                </g>
            </svg>
            <pre className={styles.heroResponse}>
{`{ "name": "Nørrebroparken",
  "distance_m": 420 }`}
            </pre>
        </div>
    );
}

export default function Geospatial() {
    return (
        <Layout title={pageTitle} description={pageDescription}>
            <Head>
                <link rel="canonical" href="https://centia.io/geospatial" />
                <meta property="og:title" content={`${pageTitle} | Centia.io`} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content="https://centia.io/img/social-card-geospatial.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content="https://centia.io/geospatial" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${pageTitle} | Centia.io`} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content="https://centia.io/img/social-card-geospatial.png" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: pageTitle,
                        description: pageDescription,
                        url: 'https://centia.io/geospatial',
                        isPartOf: {
                            '@type': 'WebSite',
                            name: 'Centia.io',
                            url: 'https://centia.io/',
                        },
                    })}
                </script>
            </Head>

            <div className={styles.page}>
                <header className={styles.hero}>
                    <div className={clsx('container', styles.heroInner)}>
                        <div className={styles.heroCopy}>
                            <p className={styles.kicker}>Geospatial backend as a service</p>
                            <Heading as="h1" className={styles.heroTitle}>
                                From spatial data to API in minutes
                            </Heading>
                            <p className={styles.heroSubtitle}>
                                Centia is a backend as a service built for geospatial. Upload a
                                Shapefile, GeoJSON or GeoPackage — get a managed PostGIS database
                                with SQL, GraphQL, realtime APIs and OGC services (WMS/WFS) out
                                of the box.
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link
                                    className="button button--primary button--lg"
                                    to="/console"
                                    onClick={() =>
                                        trackCtaClick('cta_cloud_start_click', {location: 'geo_hero'})
                                    }
                                >
                                    Start in Centia Cloud
                                </Link>
                                <Link
                                    className="button button--secondary button--lg"
                                    to="/docs/import"
                                    onClick={() =>
                                        trackCtaClick('cta_import_demo_click', {location: 'geo_hero'})
                                    }
                                >
                                    Try the import flow
                                </Link>
                                <Link
                                    className={styles.docsGhostLink}
                                    to="/docs/start"
                                    onClick={() =>
                                        trackCtaClick('cta_docs_start_click', {location: 'geo_hero'})
                                    }
                                >
                                    Read the Docs →
                                </Link>
                            </div>
                            <ul className={styles.formatPills}>
                                {formats.map((format) => (
                                    <li key={format}>{format}</li>
                                ))}
                            </ul>
                            <p className={styles.heroTrust}>
                                Open source (AGPLv3)
                                <span aria-hidden="true"> · </span>
                                <Link
                                    to="https://github.com/centia-io"
                                    onClick={() => trackCtaClick('cta_github_click', {location: 'geo_hero'})}
                                >
                                    GitHub
                                </Link>
                                <span aria-hidden="true"> · </span>
                                PostgreSQL 16 + PostGIS 3.4
                            </p>
                        </div>
                        <HeroMap />
                    </div>
                </header>

                <main>
                    <section className={styles.section}>
                        <div className="container">
                            <Heading as="h2" className={styles.sectionTitle}>
                                How it works
                            </Heading>
                            <div className={styles.steps}>
                                {steps.map((step) => (
                                    <div key={step.marker} className={styles.step}>
                                        <span className={styles.stepMarker}>{step.marker}</span>
                                        <Heading as="h3">{step.title}</Heading>
                                        <p>{step.description}</p>
                                        <Link to={step.link.to} className={styles.stepLink}>
                                            {step.link.label} →
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className={clsx(styles.section, styles.sectionAlt)}>
                        <div className="container">
                            <Heading as="h2" className={styles.sectionTitle}>
                                Built for geospatial work, end to end
                            </Heading>
                            <div className={styles.featureGrid}>
                                {features.map((feature) => (
                                    <div key={feature.title} className={styles.featureCard}>
                                        <span className={styles.featureIcon} aria-hidden="true">
                                            {feature.icon}
                                        </span>
                                        <Heading as="h3">{feature.title}</Heading>
                                        <p>{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <div className={clsx('container', styles.codeSection)}>
                            <div className={styles.codeCopy}>
                                <Heading as="h2" className={styles.sectionTitle}>
                                    Full spatial SQL, parameterized
                                </Heading>
                                <p>
                                    Parameterized SQL over REST or WebSocket — same query, typed
                                    response in the SDK. Named parameters like <code>:lng</code> and{' '}
                                    <code>:lat</code> with explicit casts keep queries safe and
                                    correctly typed.
                                </p>
                                <Link to="/docs/statement" className={styles.stepLink}>
                                    Read the SQL API docs →
                                </Link>
                            </div>
                            <div className={styles.codeBlock}>
                                <CodeBlock language="sql">{sqlExample}</CodeBlock>
                            </div>
                        </div>
                    </section>

                    <section className={clsx(styles.section, styles.sectionAlt)}>
                        <div className={clsx('container', styles.codeSection)}>
                            <div className={styles.codeCopy}>
                                <Heading as="h2" className={styles.sectionTitle}>
                                    Standard OGC services — WMS &amp; WFS
                                </Heading>
                                <p>
                                    Every table with a geometry column is served as WMS and WFS.
                                    Render server-styled map images, fetch vector features, or edit
                                    data through WFS-T — from QGIS, OpenLayers, Leaflet or any
                                    OGC-compliant client. Styling is configured with classes,
                                    styles and labels through the Layer API.
                                </p>
                                <Link to="/docs/ogc" className={styles.stepLink}>
                                    Read the OGC services docs →
                                </Link>
                                <br />
                                <Link to="/docs/layer/layers" className={styles.stepLink}>
                                    Style layers with the Layer API →
                                </Link>
                            </div>
                            <div className={styles.codeBlock}>
                                <CodeBlock language="bash">{ogcExample}</CodeBlock>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <div className="container">
                            <Heading as="h2" className={styles.sectionTitle}>
                                What developers build on Centia
                            </Heading>
                            <div className={styles.useCaseGrid}>
                                {useCases.map((useCase) => (
                                    <div key={useCase.title} className={styles.useCaseCard}>
                                        <Heading as="h3">{useCase.title}</Heading>
                                        <p>{useCase.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className={styles.finalCta}>
                        <div className="container">
                            <Heading as="h2">See what your data looks like as an API</Heading>
                            <p>
                                Try the import flow with one of your own files. Centia Cloud is free
                                while in beta — see the <Link to="/faq" className={styles.finalCtaLink}>FAQ</Link> for limits.
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link
                                    className="button button--secondary button--lg"
                                    to="/console"
                                    onClick={() =>
                                        trackCtaClick('cta_cloud_start_click', {location: 'geo_footer'})
                                    }
                                >
                                    Start in Centia Cloud
                                </Link>
                                <Link
                                    className={clsx('button', 'button--lg', styles.ctaGhost)}
                                    to="/docs/start"
                                    onClick={() =>
                                        trackCtaClick('cta_docs_start_click', {location: 'geo_footer'})
                                    }
                                >
                                    Explore the docs
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </Layout>
    );
}
