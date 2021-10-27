import React from "react"
import styles from "../styles/Workspace.module.css"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../redux/hooks"
import Request from "../components/workspace/Request"

const Workspace = () => {
  const dispatch = useDispatch()
  const userLogin = useTypedSelector((state) => state.userLogin)

  const login = () => {
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: { name: "Brian", id: 222, email: "123@345.okm" },
    })
  }

  return (
    <div className={styles.root}>
      <h1>Workspace</h1>
      <section>{userLogin.user && <p>user: {userLogin.user.name}</p>}</section>
      <section>
        <button onClick={login}>Dispatch login</button>
      </section>
      <Request />
    </div>
  )
}

export default Workspace
