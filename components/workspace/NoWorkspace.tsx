import React from 'react'
import styles from '../../styles/Workspace.module.css'

const NoWorkspace = () => {
  return (
    <div className={styles.NWwrapper}>
      <div className={styles.NWdrawer}>no project</div>
      <div className={styles.NWcontainer}>
        <div className={styles.NWcontent}>
          <h3>No project selected</h3>
          <p>Open existing or create new project</p>
        </div>
      </div>
    </div>
  )
}

export default NoWorkspace
