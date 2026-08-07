import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Head from '@docusaurus/Head';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import { trackCtaClick } from '../utils/analytics';
import styles from './index.module.css';

const codeSnippets = [
    {
        id: 'sdk',
        label: 'JS / TS SDK',
        language: 'typescript',
        code: `import { PasswordFlow, Sql } from '@centia-io/sdk';

// Sign in once — the SDK stores and refreshes tokens for you
await new PasswordFlow({
  host: 'https://api.centia.io',
  clientId: 'your-client-id',
  username: 'your-username',
  password: process.env.CENTIA_PASSWORD,
  database: 'your-database',
}).signIn();

// Parameterized spatial SQL on PostgreSQL + PostGIS
const { data } = await new Sql().exec({
  q: \`select name, st_asgeojson(geom) as location
      from places
      where st_dwithin(geom::geography,
        st_setsrid(st_makepoint(:lng, :lat), 4326)::geography, :radius)\`,
  params: { lng: 12.5683, lat: 55.6761, radius: 2000 },
});`,
    },
    {
        id: 'mcp',
        label: 'AI Agent (MCP)',
        language: 'json',
        code: `{
  "mcpServers": {
    "centia-io": {
      "command": "npx",
      "args": ["-y", "@centia-io/mcp-server"],
      "env": {
        "API_TOKEN": "your-access-token",
        "API_BASE_URL": "https://api.centia.io"
      }
    }
  }
}`,
    },
    {
        id: 'sql',
        label: 'Spatial SQL',
        language: 'sql',
        code: `-- POST your SQL to /api/v4/sql with named parameters
SELECT
  name, 
  category,
  ST_Distance(
    geom::geography, 
    ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography
  ) AS distance_meters
FROM locations
WHERE ST_DWithin(
  geom::geography,
  ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
  :radius
)
ORDER BY distance_meters ASC
LIMIT 10;`,
    },
    {
        id: 'docker',
        label: 'Self-Host',
        language: 'bash',
        code: `# Self-host the full stack: app, WebSockets, PostGIS and Redis
git clone https://github.com/centia-io/centia-docker.git
cd centia-docker
docker compose up --build -d

# Connect with the CLI
npm install -g @centia-io/cli
centia connect http://localhost:81
centia login`,
    },
];

const quickSteps = [
    {
        step: '01',
        title: 'Deploy in Seconds',
        description: 'Launch in managed Centia Cloud with zero infrastructure setup, or spin up self-hosted with Docker Compose on your own servers.',
        link: { to: '/docs/opensource', label: 'Explore Docker setup' },
    },
    {
        step: '02',
        title: 'Auto-Generated APIs',
        description: 'Instant REST, GraphQL, Spatial SQL, and Realtime WebSocket subscriptions over your PostgreSQL & PostGIS database tables.',
        link: { to: '/docs/intro', label: 'View API docs' },
    },
    {
        step: '03',
        title: 'Connect Apps & AI Agents',
        description: 'Query via TypeScript SDKs with built-in OAuth2, or connect LLMs and AI coding assistants directly via Model Context Protocol (MCP).',
        link: { to: '/docs/sdk', label: 'See SDK & MCP docs' },
    },
];

function CodeShowcase() {
    const [activeTab, setActiveTab] = useState('sdk');

    const selectTab = (id) => {
        setActiveTab(id);
        trackCtaClick('hero_code_tab_click', { tab: id });
    };

    const handleTabKeyDown = (event) => {
        const currentIndex = codeSnippets.findIndex((s) => s.id === activeTab);
        let nextIndex = null;
        if (event.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % codeSnippets.length;
        } else if (event.key === 'ArrowLeft') {
            nextIndex = (currentIndex - 1 + codeSnippets.length) % codeSnippets.length;
        } else if (event.key === 'Home') {
            nextIndex = 0;
        } else if (event.key === 'End') {
            nextIndex = codeSnippets.length - 1;
        }
        if (nextIndex !== null) {
            event.preventDefault();
            selectTab(codeSnippets[nextIndex].id);
            event.currentTarget
                .closest('[role="tablist"]')
                ?.querySelectorAll('[role="tab"]')[nextIndex]
                ?.focus();
        }
    };

    return (
        <div className={styles.codeShowcase}>
            <div className={styles.codeHeader}>
                <div className={styles.windowControls} aria-hidden="true">
                    <span className={clsx(styles.dot, styles.dotRed)} />
                    <span className={clsx(styles.dot, styles.dotYellow)} />
                    <span className={clsx(styles.dot, styles.dotGreen)} />
                </div>
                <div className={styles.tabList} role="tablist" aria-label="Code examples">
                    {codeSnippets.map((snippet) => (
                        <button
                            key={snippet.id}
                            id={`code-tab-${snippet.id}`}
                            role="tab"
                            aria-selected={activeTab === snippet.id}
                            aria-controls={`code-tabpanel-${snippet.id}`}
                            tabIndex={activeTab === snippet.id ? 0 : -1}
                            className={clsx(styles.tabButton, activeTab === snippet.id && styles.tabButtonActive)}
                            onClick={() => selectTab(snippet.id)}
                            onKeyDown={handleTabKeyDown}
                        >
                            {snippet.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.codeBody}>
                {codeSnippets.map((snippet) => (
                    <div
                        key={snippet.id}
                        id={`code-tabpanel-${snippet.id}`}
                        role="tabpanel"
                        aria-labelledby={`code-tab-${snippet.id}`}
                        aria-hidden={activeTab !== snippet.id}
                        className={clsx(styles.codePanel, activeTab === snippet.id && styles.codePanelActive)}
                    >
                        <CodeBlock language={snippet.language}>
                            {snippet.code}
                        </CodeBlock>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    const pageTitle = 'Postgres BaaS — Cloud, Self-Hosted & AI-Ready';
    const pageDescription = 'Build fast on managed Centia Cloud or self-host with Docker. Get PostgreSQL with PostGIS, OAuth2, realtime APIs, SDKs, and native MCP support for AI agents.';

    return (
        <Layout title={pageTitle} description={pageDescription}>
            <Head>
                <link rel="canonical" href="https://centia.io/" />
                <meta property="og:title" content="Centia.io | Postgres BaaS for Cloud and Self-Hosting" />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content="https://centia.io/img/social-card.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content="https://centia.io/" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Centia.io | Postgres BaaS for Cloud and Self-Hosting" />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content="https://centia.io/img/social-card.png" />

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
                    <div className={clsx('container', styles.heroContainer)}>
                        <div className={styles.heroCopy}>
                            <div className={styles.heroBadge}>
                                <span className={styles.badgeSparkle}>✨</span>
                                <span>Managed Postgres & PostGIS • AI Agent Ready (MCP) • Cloud & Self-Hosted</span>
                            </div>
                            <Heading as="h1" className={styles.heroTitle}>
                                The Postgres Backend for Modern Apps & AI Agents
                            </Heading>
                            <p className={styles.heroSubtitle}>
                                Build fast on managed <strong>Centia Cloud</strong> or self-host with <strong>Docker</strong>. Get PostgreSQL with PostGIS, OAuth2, Realtime APIs, SDKs, and native MCP support out of the box.
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link
                                    className="button button--primary button--lg"
                                    to="/console"
                                    onClick={() => trackCtaClick('cta_cloud_start_click', { location: 'home_hero' })}
                                >
                                    Start in Centia Cloud
                                </Link>
                                <Link
                                    className="button button--secondary button--lg"
                                    to="/docs/opensource"
                                    onClick={() => trackCtaClick('cta_self_host_click', { location: 'home_hero' })}
                                >
                                    Self-host with Docker
                                </Link>
                                <Link
                                    className={styles.docsGhostLink}
                                    to="/docs/start"
                                    onClick={() => trackCtaClick('cta_docs_start_click', { location: 'home_hero' })}
                                >
                                    Read the Docs →
                                </Link>
                            </div>
                            <p className={styles.heroTrust}>
                                Open source (AGPLv3)
                                <span aria-hidden="true"> · </span>
                                <Link
                                    to="https://github.com/centia-io"
                                    onClick={() => trackCtaClick('cta_github_click', { location: 'home_hero' })}
                                >
                                    GitHub
                                </Link>
                                <span aria-hidden="true"> · </span>
                                PostgreSQL 16 + PostGIS 3.4
                            </p>
                        </div>

                        <div className={styles.heroVisual}>
                            <CodeShowcase />
                        </div>
                    </div>
                </header>

                <main>
                    {/* Quickstart 3-Step Section */}
                    <section className={styles.quickstartSection}>
                        <div className="container">
                            <div className={styles.sectionHeader}>
                                <Heading as="h2" className={styles.sectionTitle}>
                                    From Schema to Production in Minutes
                                </Heading>
                                <p className={styles.sectionSub}>
                                    Everything you need to ship full-stack backends without infrastructure complexity.
                                </p>
                            </div>
                            <div className={styles.quickStepsGrid}>
                                {quickSteps.map((step) => (
                                    <div key={step.step} className={styles.stepCard}>
                                        <div className={styles.stepBadge}>{step.step}</div>
                                        <Heading as="h3" className={styles.stepTitle}>{step.title}</Heading>
                                        <p className={styles.stepDesc}>{step.description}</p>
                                        <Link to={step.link.to} className={styles.stepLink}>
                                            {step.link.label} →
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Features Grid */}
                    <HomepageFeatures />

                    {/* AI Agent / MCP Spotlight Section */}
                    <section className={styles.mcpSection}>
                        <div className="container">
                            <div className={styles.mcpBox}>
                                <div className={styles.mcpCopy}>
                                    <div className={styles.mcpBadge}>
                                        <span>🤖 Native MCP Support</span>
                                    </div>
                                    <Heading as="h2" className={styles.mcpTitle}>
                                        Built for the AI-Assisted Era
                                    </Heading>
                                    <p className={styles.mcpSub}>
                                        Give Cursor, Claude Desktop, and custom LLM agents direct context to inspect schemas, execute spatial SQL, and run backend workflows through Centia&apos;s official Model Context Protocol (MCP) server.
                                    </p>
                                    <ul className={styles.mcpList}>
                                        <li>
                                            <strong>Automated Schema Context:</strong> AI agents understand your database tables, foreign keys, and GIS columns instantly.
                                        </li>
                                        <li>
                                            <strong>Safe Execution Boundaries:</strong> Enforce strict OAuth2 permissions, SQL parameterization, and environment scoping.
                                        </li>
                                        <li>
                                            <strong>Natural Language Workflows:</strong> Go from user prompt to live database queries and spatial analytics seamlessly.
                                        </li>
                                    </ul>
                                    <div className={styles.mcpCta}>
                                        <Link
                                            className="button button--primary button--lg"
                                            to="/docs/vibe-coding"
                                            onClick={() => trackCtaClick('cta_mcp_docs_click', { location: 'mcp_spotlight' })}
                                        >
                                            Connect AI Agents via MCP →
                                        </Link>
                                    </div>
                                </div>
                                <div className={styles.mcpVisual}>
                                    <div className={styles.mcpTerminalCard}>
                                        <div className={styles.mcpTerminalHeader}>
                                            <span className={styles.mcpTerminalDot} />
                                            <span className={styles.mcpTerminalTitle}>centia-mcp-agent.log</span>
                                        </div>
                                        <pre className={styles.mcpLogOutput}>
{`[MCP Agent] Connected to Centia Backend (https://api.centia.io)
[MCP Schema] Loaded 14 tables (PostgreSQL 16 + PostGIS 3.4)
[MCP Command] Executing spatial query for prompt: "Find nearest parks"
[SQL Execution] SELECT name, ST_Distance(...) FROM parks LIMIT 5;
[Response] 5 rows returned in 12ms. Context injected.`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Final Call to Action */}
                    <section className={styles.finalCtaSection}>
                        <div className="container">
                            <div className={styles.finalCtaBox}>
                                <Heading as="h2" className={styles.finalCtaTitle}>
                                    Ready to build your next Postgres backend?
                                </Heading>
                                <p className={styles.finalCtaSub}>
                                    Centia Cloud is free while in beta — or spin up a self-hosted instance with Docker.{' '}
                                    <Link to="/faq">See the FAQ</Link> for beta limits.
                                </p>
                                <div className={styles.finalCtaButtons}>
                                    <Link
                                        className="button button--primary button--lg"
                                        to="/console"
                                        onClick={() => trackCtaClick('cta_cloud_start_click', { location: 'home_bottom' })}
                                    >
                                        Start in Centia Cloud
                                    </Link>
                                    <Link
                                        className="button button--secondary button--lg"
                                        to="/docs/start"
                                        onClick={() => trackCtaClick('cta_docs_start_click', { location: 'home_bottom' })}
                                    >
                                        Read the Docs →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </Layout>
    );
}

