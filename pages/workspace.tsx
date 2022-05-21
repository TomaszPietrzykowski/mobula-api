import React from "react"
import styles from "../styles/Workspace.module.css"
// import { useDispatch } from "react-redux"
import { useTypedSelector } from "../redux/hooks"
import RequestsBrowser from "../components/workspace/RequestsBrowser"
import { defaultWorkspace } from "../utils/defaults"

const Workspace: React.FC = () => {
  const userLogin = useTypedSelector((state) => state.userLogin)
  // const ws = useTypedSelector((state) => state.workspaceActive)
  const ws = defaultWorkspace

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>{ws.name}</h1>
      </div>
      <div className={styles.container}>
        <aside className={styles.drawer}>
          <h2>Collections: {ws.name}</h2>
          <nav>
            <ul>
              <li>
                <b>collections</b>
              </li>
              <li>
                <b>collections</b>
              </li>
              <li>
                <b>collections</b>
              </li>
              <li>
                <b>collections</b>
              </li>
              <li>
                <b>collections</b>
              </li>
              <li>
                <b>collections</b>
              </li>
              <li>request</li>
              <li>request</li>
              <li>request</li>
            </ul>
          </nav>
        </aside>
        <main className={styles.workbench}>
          <RequestsBrowser requests={defaultWorkspace.openRequests} />
        </main>
      </div>
    </div>
  )
}

export default Workspace
