import Head from 'next/head'
import { FC } from 'react'
import FeaturesSection from '../components/home/FeaturesSection'
import HeroSection from '../components/home/HeroSection'
import styles from '../styles/Home.module.css'

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mobula API</title>
        <meta
          name='description'
          content='Mobula.dev: Browser based HTTP/API client'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  )
}

export default Home
