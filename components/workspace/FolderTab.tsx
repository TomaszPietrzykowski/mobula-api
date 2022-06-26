import React, { useState } from 'react'
import styles from '../../styles/Workspace.module.css'

const FolderTab = ({
  collection,
  setNewRequestModalOpen,
  setNewReqCollection,
  handleRequestOpen,
}) => {
  const [tabOpen, setTabOpen] = useState<Boolean>(true)

  const handleNewReq = () => {
    setNewReqCollection(collection)
    setNewRequestModalOpen(true)
  }
  return (
    <React.Fragment>
      <li
        className={styles.folderDrawerTab}
        onClick={() => setTabOpen(!tabOpen)}
      >
        {collection.name}
      </li>
      {tabOpen && (
        <React.Fragment>
          {collection.requests.length > 0 && (
            <React.Fragment>
              {collection.requests.map((req) => (
                <li
                  key={req._id}
                  className={styles.reqDrawerTab}
                  id={req._id}
                  onClick={handleRequestOpen}
                >
                  {req.reqName}
                </li>
              ))}
            </React.Fragment>
          )}
          <li className={styles.addRequestTab} onClick={handleNewReq}>
            + add reqquest
          </li>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default FolderTab
