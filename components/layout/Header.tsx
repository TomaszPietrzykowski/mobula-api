import Link from "next/link"
import { useDispatch } from "react-redux"
import styles from "../../styles/Header.module.css"
import * as constants from "../../redux/constants/userConstants"

export interface Props {
  title: string
  color?: string
}

const Header = (props: Props): JSX.Element => {
  const dispatch = useDispatch()
  return (
    <header className={styles.root}>
      <h1 style={{ color: props.color }}>{props.title}</h1>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/workspace">
              <a>Workspace</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li
            onClick={() => {
              dispatch({ type: constants.USER_LOGIN_RESET })
            }}
          >
            Logout
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
