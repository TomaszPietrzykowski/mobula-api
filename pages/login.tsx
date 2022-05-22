import React, { useState } from "react"
import styles from "../styles/Workspace.module.css"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../redux/hooks"
import { logIn } from "../redux/actions/userActions"

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [remember, setRemember] = useState<boolean>(true)
  const [showPass, setShowPass] = useState<boolean>(false)

  const userLogin = useTypedSelector((state) => state.userLogin)
  const dispatch = useDispatch()

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(logIn(email, password))
  }

  return (
    <div className={styles.container}>
      <main className={styles.workbench}>
        {userLogin && userLogin.user.name ? (
          <h1>{userLogin.user.name}</h1>
        ) : (
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={submitHandler}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <label htmlFor="showPass">Show Password</label>
              <input
                type="checkbox"
                defaultChecked={showPass}
                name="showPass"
                id="showPass"
                onChange={(e) => setShowPass(e.target.checked)}
              />
              <br />
              <label htmlFor="remember">Remember Me</label>
              <input
                type="checkbox"
                defaultChecked={remember}
                name="remember"
                id="remember"
                onChange={(e) => setRemember(e.target.checked)}
              />
              <br />
              <button type="submit">Log In</button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

export default LogIn
