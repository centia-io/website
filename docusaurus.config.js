// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {

  title: 'Centia.io',
  tagline: 'PostgreSQL/PostGIS backend for developers who love control',
  favicon: 'img/centia-logo.svg',

  // Set the production url of your site here
  url: 'https://centia.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // Avoid duplicate content from both with/without trailing slash
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'centia-io', // Usually your GitHub org/user name.
  projectName: 'centia-io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'da-DK'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/centia-io/website/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/centia-io/website/tree/main',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.6,
          filename: 'sitemap.xml',
          ignorePatterns: ['/tags/**', '/__docusaurus/**'],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/centia-logo.svg',
      metadata: [
        {name: 'description', content: 'Centia.io is a developer-first PostgreSQL/PostGIS backend with JSON-RPC, realtime, OAuth, and a CLI. Build data-heavy apps with full control.'},
        {name: 'keywords', content: 'Centia, PostgreSQL, PostGIS, backend, BaaS, JSON-RPC, realtime, OAuth, SQL, CLI'},
        {property: 'og:type', content: 'website'},
        {property: 'og:site_name', content: 'Centia.io'},
        {name: 'twitter:card', content: 'summary_large_image'},
      ],
      navbar: {
        title: 'Centia.io',
        logo: {
          alt: 'Centia logo',
          src: 'img/centia-logo.svg',
          srcDark: 'img/centia-logo-dark.svg',
        },
        items: [
          {to: 'console', label: 'Console', position: 'left'},
          {to: 'faq', label: 'FAQ', position: 'left'},
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://api.centia.io/swagger-ui/index.html',
            label: 'Open API',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/centia.io',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/centia-io/',
              },
            ],
          }, {
            title: 'Support',
            items: [
              {
                label: 'E-mail',
                href: 'mailto:info@mapcentia.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Centia.io`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'diff', 'json', 'powershell', 'http']
      },
    }),
  scripts: [{src: 'https://js.stripe.com/v3/pricing-table.js', defer: true, 'data-domain': 'localhost:4000'}],
};

export default config;
