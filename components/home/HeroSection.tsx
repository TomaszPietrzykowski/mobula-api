import React from 'react'
import styles from '../../styles/Home.module.css'

const HeroSection = (): JSX.Element => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.slogan}>
        <h1>
          Effortless Api design
          <br />
          and testing
        </h1>
        <p>
          Browser based HTTP client. Draft, save, organize and test your
          endpoints from wherever you are.
        </p>
      </div>
      <div className={styles.image}>mobula pic</div>
    </div>
  )
}

export default HeroSection
