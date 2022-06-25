import React, { useEffect, useState } from 'react'
import styles from '../styles/Workspace.module.css'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../redux/hooks'
import RequestsBrowser from '../components/workspace/RequestsBrowser'
import {
  getWorkspace,
  openReqInWorkspace,
} from '../redux/actions/workspaceActions'
import Modal from 'react-modal'
import FolderTab from '../components/workspace/FolderTab'
import CreateNewRequest from '../components/workspace/CreateNewRequest'
import EnvModal from '../components/workspace/EnvModal'
import { openEnv } from '../redux/actions/envActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Workspace: React.FC = () => {
  const userLogin = useTypedSelector((state) => state.userLogin)
  const { env } = useTypedSelector((state) => state.envActive)
  const { workspace, loading, error } = useTypedSelector(
    (state) => state.workspaceActive
  )

  const [modalWelcomeOpen, setModalWelcomeOpen] = useState<boolean>(false)
  const [modalNewReqOpen, setModalNewReqOpen] = useState<boolean>(false)
  const [modalNewCollectionOpen, setModalNewCollectionOpen] =
    useState<boolean>(false)
  const [modalEditCollectionOpen, setModalEditCollectionOpen] =
    useState<boolean>(false)
  const [modalEnvOpen, setModalEnvOpen] = useState<boolean>(false)
  const [newReqCollection, setNewReqCollection] = useState<object>({
    name: '../',
    _id: '1',
  })

  const router = useRouter()
  const dispatch = useDispatch()

  Modal.setAppElement('#__next')

  useEffect(() => {
    if (!userLogin.user.name) {
      router.push('/login')
    }
    if (userLogin.user.workspaceActive && !workspace._id) {
      dispatch(
        getWorkspace(userLogin.user.workspaceActive, userLogin.user.token)
      )
    }
    if (workspace && workspace.env !== '') {
      dispatch(openEnv(workspace.env, userLogin.user.token))
    }
    if (router.query.ftv === 'register') {
      setModalWelcomeOpen(true)
    }
  }, [userLogin, userLogin.user.workspaceActive, workspace, workspace.env])

  const handleClick = (e: any): void => {
    dispatch(openReqInWorkspace(e?.target.id, workspace))
  }

  const handleNewRootReq = (e: any): void => {
    setNewReqCollection({ name: '../', _id: '1' })
    setModalNewReqOpen(true)
  }
  const handleWelcomeModalClose = (e: any): void => {
    setModalWelcomeOpen(false)
    router.push('/workspace')
  }

  return (
    <div className={styles.root}>
      {loading ? (
        <h1>loading workspace</h1>
      ) : !workspace ? (
        <h1>no workspace</h1>
      ) : (
        <React.Fragment>
          <div className={styles.header}>
            <div className={styles.leftPanel}>
              <div className={styles.workspaceName}>{workspace.name}</div>
              <div className={styles.workspaceActions}>
                <div className={styles.iconContainer}>
                  <FontAwesomeIcon
                    icon={['far', 'pen-to-square']}
                    className={styles.iconEdit}
                  />
                </div>
              </div>
            </div>
            <div
              className={styles.rightPanel}
              onClick={() => setModalEnvOpen(true)}
            >
              <div className={styles.iconContainer}>
                <FontAwesomeIcon
                  icon={['far', 'floppy-disk']}
                  className={styles.iconSave}
                />
              </div>
              {env.name ? (
                <div className={styles.envNamenv}>{`ENV: ${env.name}`}</div>
              ) : (
                <div
                  className={styles.noEnv}
                  onClick={() => setModalEnvOpen(true)}
                >
                  no environment
                </div>
              )}
            </div>
          </div>
          <div className={styles.container}>
            <aside className={styles.drawer}>
              <div>
                <FontAwesomeIcon
                  icon={['fas', 'folder-tree']}
                  className={styles.iconFolderTree}
                />
              </div>
              <nav>
                <ul>
                  {workspace.collections.map((folder) => (
                    <FolderTab
                      key={folder._id}
                      collection={folder}
                      setNewRequestModalOpen={setModalNewReqOpen}
                      handleRequestOpen={handleClick}
                      setNewReqCollection={setNewReqCollection}
                    />
                  ))}
                  {workspace.requests.map((request) => (
                    <li
                      key={request._id}
                      id={request._id}
                      className={styles.reqLooseTab}
                      onClick={handleClick}
                    >
                      {request.reqName}
                    </li>
                  ))}
                  <li
                    className={styles.addRequestTab}
                    onClick={handleNewRootReq}
                  >
                    + add reqquest
                  </li>
                </ul>
              </nav>
            </aside>
            <main className={styles.workbench}>
              {workspace.openRequests.length > 0 && <RequestsBrowser />}
            </main>
          </div>
          <Modal
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setModalNewReqOpen(false)}
            isOpen={modalNewReqOpen}
            style={modalStyles}
          >
            <CreateNewRequest selectedCollection={newReqCollection} />
          </Modal>
          <Modal
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setModalNewCollectionOpen(false)}
            isOpen={modalNewCollectionOpen}
            style={modalStyles}
          >
            <h1>New collection</h1>
          </Modal>
          <Modal
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setModalEditCollectionOpen(false)}
            isOpen={modalEditCollectionOpen}
            style={modalStyles}
          >
            <h1>Edit collection</h1>
          </Modal>
          <Modal
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleWelcomeModalClose}
            isOpen={modalWelcomeOpen}
            style={modalStyles}
          >
            <h1>Welcome in Mobula</h1>
            <p>
              We've setup for you a skeleton project with couple of exemplary
              requests to get you up and running.
            </p>
            <button onClick={handleWelcomeModalClose}>OK, lets go!</button>
          </Modal>
          <Modal
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setModalEnvOpen(false)}
            isOpen={modalEnvOpen}
            style={modalStyles}
          >
            <EnvModal />
          </Modal>
        </React.Fragment>
      )}
    </div>
  )
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid rgb(127, 155, 160)',
    background: 'rgb(24, 32, 37)',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    minWidth: '70vw',
    height: 'min-content',
  },
}

export default Workspace
