import React, { useEffect, useState } from 'react'
import styles from '../styles/Workspace.module.css'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../redux/hooks'
import RequestsBrowser from '../components/workspace/RequestsBrowser'
import { openReqInWorkspace } from '../redux/actions/workspaceActions'
import Modal from 'react-modal'
import FolderTab from '../components/workspace/FolderTab'
import CreateNewRequest from '../components/workspace/CreateNewRequest'
import EnvModal from '../components/workspace/EnvModal'

const Workspace: React.FC = () => {
  const userLogin = useTypedSelector((state) => state.userLogin)
  const { workspace, loading, error } = useTypedSelector(
    (state) => state.workspaceActive
  )

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
  })

  const handleClick = (e: any): void => {
    dispatch(openReqInWorkspace(e?.target.id, workspace))
  }

  const handleNewRootReq = (e: any): void => {
    setNewReqCollection({ name: '../', _id: '1' })
    setModalNewReqOpen(true)
  }

  return (
    <div className={styles.root}>
      {loading ? (
        <h1>loading workspace</h1>
      ) : (
        <React.Fragment>
          <div className={styles.header}>
            <h1>{workspace.name}</h1>
          </div>
          <div className={styles.container}>
            <aside className={styles.drawer}>
              <h2>Collections</h2>
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
