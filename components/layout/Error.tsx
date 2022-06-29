import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../styles/Utils.module.css'

const AppError = ({ error }) => {
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorContent}>
        <div className={styles.errorGraphic}>
          <FontAwesomeIcon
            icon={['fas', 'bomb']}
            className={styles.errorIcon}
          />
        </div>
        <div className={styles.errorText}>{error}</div>
      </div>
    </div>
  )
}

export default AppError
