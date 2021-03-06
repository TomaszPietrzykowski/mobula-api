import React, { useEffect, useState } from 'react'
import styles from '../styles/Login.module.css'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../redux/hooks'
import { logIn } from '../redux/actions/userActions'
import { getWorkspace } from '../redux/actions/workspaceActions'
import { useRouter } from 'next/router'
import AppError from '../components/layout/Error'

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(true)
  const [showPass, setShowPass] = useState<boolean>(false)

  const { user, error, loading, success } = useTypedSelector(
    (state) => state.userLogin
  )
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (user && user.workspaceActive) {
      dispatch(getWorkspace(user.workspaceActive, user))
    }
    if (user && user.name) {
      if (router.query.redirect) {
        router.push(`${router.query.redirect}`)
      } else {
        router.push('/workspace')
      }
    }
  }, [user, success, user?.workspaceActive])

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(logIn(email, password))
  }

  return (
    <div className={styles.container}>
      <main className={styles.workbench}>
        {error ? (
          <AppError error={error} />
        ) : (
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={submitHandler}>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor='password'>Password</label>
              <input
                type={showPass ? 'text' : 'password'}
                name='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <label htmlFor='showPass'>Show Password</label>
              <input
                type='checkbox'
                defaultChecked={showPass}
                name='showPass'
                id='showPass'
                onChange={(e) => setShowPass(e.target.checked)}
              />
              <br />
              <label htmlFor='remember'>Remember Me</label>
              <input
                type='checkbox'
                defaultChecked={remember}
                name='remember'
                id='remember'
                onChange={(e) => setRemember(e.target.checked)}
              />
              <br />
              <button type='submit'>Log In</button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

export default LogIn
