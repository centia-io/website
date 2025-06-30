import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';



export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
      <Layout
          title={`Hello from ${siteConfig.title}`}
          description="Description will go into a meta tag in <head />">
          <div className="hero shadow--lw">
              <div className="container">
                  <h1 className="hero__title">Centia IO</h1>
                  <p className="hero__subtitle">Start building</p>
                  <div>
                      <a href="/console" className="button button--secondary button--outline button--lg">
                          Get Started
                      </a>
                  </div>
              </div>
          </div>
          <main>
              <HomepageFeatures/>
          </main>
      </Layout>
  );
}
