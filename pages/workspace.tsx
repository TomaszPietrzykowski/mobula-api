import React from "react"
import styles from "../styles/Workspace.module.css"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../redux/hooks"
import Request from "../components/request/Request"

const Workspace = () => {
  const dispatch = useDispatch()
  const userLogin = useTypedSelector((state) => state.userLogin)

  const login = () => {
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: { name: "Brian", id: 222, email: "123@345.okm" },
    })
  }

  const workspace = { name: "New Workspace" }

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
            <button onClick={login}>Dispatch login</button>
          </section>
          <Request />
        </main>
      </div>
    </div>
  )
}

export default Workspace
