import React, { useEffect } from "react"
import styles from "../styles/Workspace.module.css"
// import { useDispatch } from "react-redux"
import { useTypedSelector } from "../redux/hooks"
import RequestsBrowser from "../components/workspace/RequestsBrowser"
// import { getWorkspace } from "../redux/actions/workspaceActions"
import { defaultWorkspace } from "../utils/defaults"

const Workspace: React.FC = () => {
  const userLogin = useTypedSelector((state) => state.userLogin)
  const { workspace, loading, error } = useTypedSelector(
    (state) => state.workspaceActive
  )

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
                  <li>
                    <b>collection</b>
                  </li>
                  <li>
                    <b>collection</b>
                  </li>
                  <li>
                    <b>collection</b>
                  </li>
                  <li>request</li>
                  <li>request</li>
                  <li>request</li>
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
