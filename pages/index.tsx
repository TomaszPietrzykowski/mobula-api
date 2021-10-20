import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'
import styles from '../styles/Home.module.css'

const Home:FC = () => {

// logic
let output: String = "test"



// output
  return (
    <div className={styles.container}>
      <Head>
        <title>MobulaAPI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Mobula API
        </h1>

        <p className={styles.description}>
          Boilerplate output:
        </p>
<article className={styles.output}>{output}</article>
      </main>
    </div>
  )
}

export default Home
