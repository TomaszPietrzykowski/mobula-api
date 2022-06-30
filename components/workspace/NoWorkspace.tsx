import React from 'react'
import styles from '../../styles/Workspace.module.css'

const NoWorkspace = ({ openProject, newProject }) => {
  return (
    <div className={styles.NWwrapper}>
      <div className={styles.NWdrawer}>no project</div>
      <div className={styles.NWcontainer}>
        <div className={styles.NWcontent}>
          <h3>No project selected</h3>
          <p>
            <button onClick={openProject}>Open Existing</button>
          </p>
          <p> or </p>
          <p>
            <button onClick={newProject}>Create New Project</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NoWorkspace
