import React, { useEffect } from "react"
import styles from "../styles/Workspace.module.css"
// import { useDispatch } from "react-redux"
import { useTypedSelector } from "../redux/hooks"
import RequestsBrowser from "../components/workspace/RequestsBrowser"
// import { getWorkspace } from "../redux/actions/workspaceActions"
import { defaultWorkspace } from "../utils/defaults"
import { useRouter } from "next/router"
import FolderTab from "../components/workspace/FolderTab"

const Workspace: React.FC = () => {
  const userLogin = useTypedSelector((state) => state.userLogin)
  const { workspace, loading, error } = useTypedSelector(
    (state) => state.workspaceActive
  )
  const router = useRouter()
  useEffect(() => {
    if (!userLogin.user.name) {
      router.push("/login")
    }
  })
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
                    // <li key={folder._id} className={styles.folderDrawerTab}>
                    //   {folder.name}
                    // </li>
                    <FolderTab key={folder._id} collection={folder} />
                  ))}
                  {workspace.requests.map((request) => (
                    <li key={request._id} className={styles.reqLooseTab}>
                      {request.reqName}
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
            <main className={styles.workbench}>
              {workspace.openRequests.length > 0 && (
                <RequestsBrowser
                  requests={workspace.openRequests}
                  selectedRequest={workspace.selectedRequest}
                />
              )}
            </main>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default Workspace
