import React, { useEffect, useState } from 'react'
import styles from '../styles/Workspace.module.css'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../redux/hooks'
import RequestsBrowser from '../components/workspace/RequestsBrowser'
import {
  deleteWorkspace,
  getWorkspace,
  openReqInWorkspace,
  updateWorkspace,
} from '../redux/actions/workspaceActions'
import Modal from 'react-modal'
import FolderTab from '../components/workspace/FolderTab'
import CreateNewRequest from '../components/workspace/CreateNewRequest'
import EnvModal from '../components/workspace/EnvModal'
import { openEnv } from '../redux/actions/envActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditWorkspaceNameModal from '../components/workspace/EditWorkspaceNameModal'
import AddCollectionModal from '../components/workspace/AddCollectionModal'
import NewWorkspaceModal from '../components/workspace/NewWorkspaceModal'
import NoRequests from '../components/workspace/NoRequests'
import NoWorkspace from '../components/workspace/NoWorkspace'
import OpenWorkspaceModal from '../components/workspace/OpenWorkspaceModal'
import AppError from '../components/layout/Error'
import EditCollectionModal from '../components/workspace/EditCollectionModal'

const Workspace: React.FC = () => {
  const userLogin = useTypedSelector((state) => state.userLogin)
  const { loading: userLoading, success: userSuccess } = userLogin
  const { env } = useTypedSelector((state) => state.envActive)
  const { workspace, loading, success, error } = useTypedSelector(
    (state) => state.workspaceActive
  )
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [modalNewProject, setModalNewProject] = useState<boolean>(false)
  const [modalOpenWorkspace, setModalOpenWorkspace] = useState<boolean>(true)
  const [modalNewFolder, setModalNewFolder] = useState<boolean>(false)
  const [modalEditName, setModalEditName] = useState<boolean>(false)
  const [modalWelcomeOpen, setModalWelcomeOpen] = useState<boolean>(false)
  const [modalNewReqOpen, setModalNewReqOpen] = useState<boolean>(false)
  const [modalNewCollectionOpen, setModalNewCollectionOpen] =
    useState<boolean>(false)
  const [modalEditCollectionOpen, setModalEditCollectionOpen] =
    useState<boolean>(false)
  const [modalEnvOpen, setModalEnvOpen] = useState<boolean>(true)
  const [newReqCollection, setNewReqCollection] = useState<object>({
    name: '../',
    _id: '1',
  })

  const router = useRouter()
  const dispatch = useDispatch()

  Modal.setAppElement('#__next')

  useEffect(() => {
    if (!userLoading) {
      if (!userLogin.user?.name) {
        router.push('/login')
      }
    }
    if (
      (userLogin.user.workspaceActive &&
        userLogin.user.workspaceActive !== '' &&
        !workspace?._id) ||
      (userLogin.user.workspaceActive &&
        workspace?._id !== userLogin.user.workspaceActive &&
        userLogin.user.workspaceActive !== '')
    ) {
      dispatch(getWorkspace(userLogin.user.workspaceActive, userLogin.user))
    }
    if (workspace && workspace.env && workspace.env !== '' && !loading) {
      dispatch(openEnv(workspace.env, userLogin.user.token))
    }
    if (router.query.ftv === 'register') {
      setModalWelcomeOpen(true)
    }
    if (
      userLogin.user?.token &&
      success &&
      userLogin.user.workspaceActive &&
      userLogin.user.workspaceActive !== ''
    ) {
      dispatch(updateWorkspace(workspace, userLogin.user.token))
    }
  }, [userLogin, workspace, workspace?.environmet, success, userSuccess])

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
  const handleUpdateWorkspace = (e: any): void => {
    dispatch(updateWorkspace(workspace, userLogin.user.token))
  }
  const handleNewFolder = (e: any): void => {
    setModalNewFolder(true)
    setMenuOpen(false)
  }
  const handleNewProject = (e: any): void => {
    setModalNewProject(true)
    setMenuOpen(false)
  }
  const handleOpenProject = (e: any): void => {
    setModalOpenWorkspace(true)
    setMenuOpen(false)
  }
  const handleDeleteProject = (e: any): void => {
    dispatch(deleteWorkspace(workspace._id, userLogin.user))
    setMenuOpen(false)
  }

  return (
    <div className={styles.root}>
      {loading || userLoading ? (
        <h1>loading workspace</h1>
      ) : error ? (
        <AppError error={error} />
      ) : !workspace?._id ? (
        <NoWorkspace
          openProject={() => setModalOpenWorkspace(true)}
          newProject={() => setModalNewProject(true)}
        />
      ) : (
        <React.Fragment>
          <div className={styles.header}>
            <div className={styles.leftPanel}>
              <div className={styles.menuContainer}>
                <div
                  className={styles.iconContainer}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <FontAwesomeIcon
                    icon={['fas', 'ellipsis-vertical']}
                    className={styles.iconWsMenu}
                  />
                </div>
                <div
                  className={
                    menuOpen
                      ? styles.menuDropdownActive
                      : styles.menuDropdownHidden
                  }
                >
                  <ul className={styles.dropdownUL}>
                    <li className={styles.menuItem} onClick={handleNewFolder}>
                      <FontAwesomeIcon
                        icon={['fas', 'folder-plus']}
                        className={styles.dropdownIcon}
                      />
                      <div className={styles.dropdownLabel}>New folder</div>
                    </li>
                    <li className={styles.menuItem}>
                      <FontAwesomeIcon
                        icon={['fas', 'circle-nodes']}
                        className={styles.dropdownIcon}
                      />
                      <div className={styles.dropdownLabel}>New request</div>
                    </li>
                    <li className={styles.menuItem} onClick={handleNewProject}>
                      <FontAwesomeIcon
                        icon={['fas', 'folder-tree']}
                        className={styles.dropdownIcon}
                      />
                      <div className={styles.dropdownLabel}>New project</div>
                    </li>
                    <li className={styles.menuItem} onClick={handleOpenProject}>
                      <FontAwesomeIcon
                        icon={['far', 'folder-open']}
                        className={styles.dropdownIcon}
                      />
                      <div className={styles.dropdownLabel}>Open project</div>
                    </li>
                    <li className={styles.menuItem}>
                      <FontAwesomeIcon
                        icon={['far', 'trash-can']}
                        className={styles.dropdownIcon}
                      />
                      <div
                        className={styles.dropdownLabel}
                        onClick={handleDeleteProject}
                      >
                        Delete project
                      </div>
                    </li>
                  </ul>
                  <div
                    className={styles.menuClose}
                    onClick={() => setMenuOpen(false)}
                  >
                    {' '}
                    X{' '}
                  </div>
                </div>
              </div>
              <div className={styles.workspaceName}>{workspace.name}</div>
              <div className={styles.workspaceActions}>
                <div className={styles.iconContainer}>
                  <FontAwesomeIcon
                    icon={['far', 'pen-to-square']}
                    className={styles.iconEdit}
                    onClick={() => setModalEditName(true)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.rightPanel}>
              <div
                className={styles.iconContainer}
                onClick={handleUpdateWorkspace}
              >
                <FontAwesomeIcon
                  icon={['far', 'floppy-disk']}
                  className={styles.iconSave}
                />
              </div>
              {env.name ? (
                // restructure ------------------ action on wrapper
                <div className={styles.envName}>{`ENV: ${env.name}`}</div>
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
              <nav>
                <ul>
                  {workspace.collections.map((folder) => (
                    <FolderTab
                      key={folder._id}
                      collection={folder}
                      setNewRequestModalOpen={setModalNewReqOpen}
                      handleRequestOpen={handleClick}
                      setNewReqCollection={setNewReqCollection}
                      setModalEditCollectionOpen={setModalEditCollectionOpen}
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
              {workspace.openRequests.length > 0 ? (
                <RequestsBrowser />
              ) : (
                <NoRequests />
              )}
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
            <EditCollectionModal
              closeModal={() => setModalEditCollectionOpen(false)}
            />
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
          <Modal
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setModalEditName(false)}
            isOpen={modalEditName}
            style={modalStyles}
          >
            <EditWorkspaceNameModal
              closeModal={() => setModalEditName(false)}
            />
          </Modal>
          <Modal
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setModalNewFolder(false)}
            isOpen={modalNewFolder}
            style={modalStyles}
          >
            <AddCollectionModal closeModal={() => setModalNewFolder(false)} />
          </Modal>
        </React.Fragment>
      )}
      <Modal
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setModalNewProject(false)}
        isOpen={modalNewProject}
        style={modalStyles}
      >
        <NewWorkspaceModal closeModal={() => setModalNewProject(false)} />
      </Modal>
      <Modal
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setModalOpenWorkspace(false)}
        isOpen={modalOpenWorkspace}
        style={modalStyles}
      >
        <OpenWorkspaceModal
          closeModal={() => setModalOpenWorkspace(false)}
          handleNewProject={handleNewProject}
        />
      </Modal>
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
