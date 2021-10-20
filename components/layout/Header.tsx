import Link from "next/link"
import styles from '../../styles/Header.module.css'

export interface Props {
    title: string
    color?: string
  }

const Header = (props: Props): JSX.Element => {
    return (
        <header className={styles.root}>
            <h1 style={{color: props.color}}>{props.title}</h1>
            <nav>
                <ul className={styles.nav}>
                    <li><Link href="/"><a>Home</a></Link></li>
                    <li><Link href="/workspace"><a>Workspace</a></Link></li>
                    </ul>
                </nav>
        </header>
    )
}

export default Header
