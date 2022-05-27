import React, { useState } from "react"
import styles from "../../styles/Workspace.module.css"

const FolderTab = ({ collection }) => {
  const [tabOpen, setTabOpen] = useState<Boolean>(false)
  return (
    <React.Fragment>
      <li
        className={styles.folderDrawerTab}
        onClick={() => setTabOpen(!tabOpen)}
      >
        {collection.name}
      </li>
      {collection.requests.length > 0 && tabOpen && (
        <React.Fragment>
          {collection.requests.map((req) => (
            <li key={req._id} className={styles.reqDrawerTab}>
              {req.reqName}
            </li>
          ))}
          <li className={styles.addRequestTab}>+ add reqquest</li>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default FolderTab
