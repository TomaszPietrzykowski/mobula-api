import React, { MouseEventHandler, useEffect } from "react"
import styles from "../styles/Workspace.module.css"
// import { useDispatch } from "react-redux"
import { useTypedSelector } from "../redux/hooks"
import RequestsBrowser from "../components/workspace/RequestsBrowser"
import { openReqInWorkspace } from "../redux/actions/workspaceActions"
// import { defaultWorkspace } from "../utils/defaults"
import { useRouter } from "next/router"
import FolderTab from "../components/workspace/FolderTab"
import { useDispatch } from "react-redux"

const Workspace: React.FC = () => {
  const userLogin = useTypedSelector((state) => state.userLogin)
  const { workspace, loading, error } = useTypedSelector(
    (state) => state.workspaceActive
  )
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!userLogin.user.name) {
      router.push("/login")
    }
  })

  const handleClick = (e: any): void => {
    dispatch(openReqInWorkspace(e?.target.id, workspace))
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
                    <FolderTab key={folder._id} collection={folder} />
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
                </ul>
              </nav>
            </aside>
            <main className={styles.workbench}>
              {workspace.openRequests.length > 0 && <RequestsBrowser />}
            </main>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default Workspace
