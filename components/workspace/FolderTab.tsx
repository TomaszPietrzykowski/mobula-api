import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import styles from '../../styles/Workspace.module.css'

const FolderTab = ({
  collection,
  setNewRequestModalOpen,
  setNewReqCollection,
  handleRequestOpen,
}) => {
  const [tabOpen, setTabOpen] = useState<Boolean>(true)

  const handleNewReq = (e) => {
    e.stopPropagation()
    setNewReqCollection(collection)
    setNewRequestModalOpen(true)
  }
  const handleDeleteCollection = (e) => {
    e.stopPropagation()
  }
  const handleEditCollection = (e) => {
    e.stopPropagation()
  }
  return (
    <React.Fragment>
      <li
        className={styles.folderDrawerTab}
        onClick={() => setTabOpen(!tabOpen)}
      >
        <div className={styles.folderLeft}>
          <div className={styles.folderCollapseBtn}>
            {tabOpen ? (
              <span>
                <FontAwesomeIcon
                  icon={['fas', 'chevron-down']}
                  className={styles.folderCollapseIcon}
                />
              </span>
            ) : (
              <span>
                <FontAwesomeIcon
                  icon={['fas', 'chevron-right']}
                  className={styles.folderCollapseIcon}
                />
              </span>
            )}
          </div>
          {collection.name}
        </div>
        <div className={styles.folderRight}>
          <div className={styles.folderMenuBtn} onClick={handleNewReq}>
            <FontAwesomeIcon
              icon={['far', 'square-plus']}
              className={styles.folderMenuIcon}
            />
          </div>
          <div className={styles.folderMenuBtn} onClick={handleEditCollection}>
            <FontAwesomeIcon
              icon={['far', 'pen-to-square']}
              className={styles.folderMenuIcon}
            />
          </div>
          <div
            className={styles.folderMenuBtn}
            onClick={handleDeleteCollection}
          >
            <FontAwesomeIcon
              icon={['far', 'trash-can']}
              className={styles.folderMenuIcon}
            />
          </div>
        </div>
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
