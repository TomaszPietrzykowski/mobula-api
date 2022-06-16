import Link from 'next/link'
import { useDispatch } from 'react-redux'
import styles from '../../styles/Header.module.css'
import * as constants from '../../redux/constants/userConstants'
import { useTypedSelector } from '../../redux/hooks'

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
        }}
      >
        Logout
      </li>
    </ul>
  )

  const userNavLoggedOut: JSX.Element = (
    <ul className={styles.nav}>
      <li>
        <Link href='/login'>
          <a>Login</a>
        </Link>
      </li>
      <li className={styles.registerBtn}>
        <Link href='/register'>
          <a>Get Started For Free</a>
        </Link>
      </li>
    </ul>
  )
  return (
    <header className={styles.root}>
      <div>
        <div>MOBULA*DEV</div>
      </div>
      <nav>
        <ul className={styles.nav}>
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
        {user.name ? userNavLoggedIn : userNavLoggedOut}
      </nav>
    </header>
  )
}

export default Header
