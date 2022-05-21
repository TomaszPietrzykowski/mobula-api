import React from "react"
import styles from "../styles/Workspace.module.css"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../redux/hooks"
import { logIn } from "../redux/actions/userActions"
// import Request from "../components/request/Request"
import RequestsBrowser from "../components/workspace/RequestsBrowser"
import { MobulaRequest, MobulaWorkspace } from "../types/index"

const Workspace = () => {
  // EXTRACT: -----------------------------------------------
  const dispatch = useDispatch()
  const login = (email: string, password: string): void => {
    dispatch(logIn(email, password))
  }
  // --------------------------------------------------------
  const userLogin = useTypedSelector((state) => state.userLogin)

  const defaultRequest: MobulaRequest = {
    reqUrl: "{{URL}}/api/public/v1/co2/{{END}}",
    reqQueries: {},
    reqHeaders: {},
    reqMethod: "GET",
    reqBody: {},
    proxy: true,
    env: [
      { key: "URL", value: "https://climatemonitor.info" },
      { key: "END", value: "latest" },
    ],
  }

  const defaultWorkspace: MobulaWorkspace = {
    name: "New Workspace",
    requests: [defaultRequest],
    env: "no env",
  }

  return (
    <div className={styles.container}>
      <div className={styles.root}>
        {/* <aside>
        <h2>Workspace: {workspace.name}</h2>
        <nav>
          <ul>
            <li>collections</li>
          </ul>
        </nav>
      </aside> */}
        <main className={styles.workbench}>
          <h1>Workspace</h1>
          <section>
            {userLogin.user && <p>user: {userLogin.user.name}</p>}
          </section>
          <section>
            <button onClick={() => login("abc@abc.pl", "123456")}>
              Dispatch login
            </button>
          </section>
          <RequestsBrowser requests={defaultWorkspace.requests} />
        </main>
      </div>
    </div>
  )
}

export default Workspace
