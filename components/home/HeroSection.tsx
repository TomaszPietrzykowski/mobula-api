import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from '../../styles/Home.module.css'

const HeroSection = (): JSX.Element => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <h1 className={styles.title}>
          Test your
          <br />
          endpoints
          <br />
          with grace
        </h1>
        <p className={styles.subtitle}>
          Browser based HTTP client <br />
          for rapid testing of APIs
        </p>
        <button className={styles.actionBtn}>Get started</button>
      </div>
    </div>
  )
}

export default HeroSection
