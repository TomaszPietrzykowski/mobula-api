import React from "react"
import styles from "../styles/Workspace.module.css"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../redux/hooks"
import { logIn } from "../redux/actions/userActions"

const LogIn: React.FC = () => {
  const dispatch = useDispatch()

  const login = (email: string, password: string): void => {
    dispatch(logIn(email, password))
  }

  const userLogin = useTypedSelector((state) => state.userLogin)

  return (
    <div className={styles.container}>
      <main className={styles.workbench}>
        {userLogin && userLogin.user.name ? (
          <h1>{userLogin.user.name}</h1>
        ) : (
          <button onClick={() => login("abc@abc.pl", "123456")}>
            Dispatch login
          </button>
        )}
      </main>
    </div>
  )
}

export default LogIn
