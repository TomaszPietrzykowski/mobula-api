import Link from 'next/link'
import { useDispatch } from 'react-redux'
import styles from '../../styles/Header.module.css'
import * as constants from '../../redux/constants/userConstants'
import * as wsConstants from '../../redux/constants/workspaceConstants'
import { useTypedSelector } from '../../redux/hooks'
import React from 'react'

const Header = (): JSX.Element => {
  const dispatch = useDispatch()

  const { user } = useTypedSelector((state) => state.userLogin)

  // -- predefine JSX ----------------------
  const userNavLoggedIn: JSX.Element = (
    <ul className={styles.nav}>
      <li>Profile</li>
      <li
        onClick={() => {
          dispatch({ type: constants.USER_LOGIN_RESET })
          dispatch({ type: constants.USER_REGISTER_RESET })
          dispatch({ type: wsConstants.WORKSPACE_ACTIVE_RESET })
        }}
      >
        Logout
      </li>
    </ul>
  )

  const userNavLoggedOut: JSX.Element = (
    <ul>
      <li>
        <Link href='/login'>
          <a>Login</a>
        </Link>
      </li>
      <Link href='/register'>
        <a className={styles.registerBtn}>
          <li>Get Started</li>
        </a>
      </Link>
    </ul>
  )

  return (
    <React.Fragment>
      <header className={styles.root}>
        <div className={styles.logo}>
          <div>MOBULA*DEV</div>
        </div>
        <nav className={styles.pageNav}>
          <ul>
            <li>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/workspace'>
                <a>Workspace</a>
              </Link>
            </li>
            <li>
              <Link href='/docs'>
                <a>Docs</a>
              </Link>
            </li>
            <li>
              <Link href='/contact'>
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className={styles.userNav}>
          {user?.name ? userNavLoggedIn : userNavLoggedOut}
        </nav>
      </header>
      <div className={styles.navbarMargin} />
    </React.Fragment>
  )
}

export default Header
