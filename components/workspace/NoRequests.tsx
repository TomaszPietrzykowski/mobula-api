import React from 'react'
import styles from '../../styles/Workspace.module.css'

const NoRequests = () => {
  return (
    <div className={styles.NRcontainer}>
      <div className={styles.NRcontent}>
        <h3>No requests open in editor</h3>
        <p>Open existing or create new request</p>
      </div>
    </div>
  )
}

export default NoRequests
