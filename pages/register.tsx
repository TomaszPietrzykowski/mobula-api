import React, { useState, useEffect } from "react"
import styles from "../styles/Workspace.module.css"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../redux/hooks"
import { register } from "../redux/actions/userActions"
import { useRouter } from "next/router"

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = useState<string>("")
  const [remember, setRemember] = useState<boolean>(true)
  const [showPass, setShowPass] = useState<boolean>(false)

  const { user, error, success } = useTypedSelector(
    (state) => state.userRegister
  )
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (success) {
      if (router.query.redirect) {
        router.push(router.query.redirect as string)
      } else {
        router.push("/")
      }
    }
  }, [user, success])

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (password && passwordConfirm && password === passwordConfirm) {
      dispatch(register(name, email, password))
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.workbench}>
        {error ? (
          <h1>{error}</h1>
        ) : (
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={submitHandler}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={name}
                name="name"
                id="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                name="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                name="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type={showPass ? "text" : "password"}
                value={passwordConfirm}
                name="passwordConfirm"
                id="passwordConfirm"
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
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
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

export default Register
