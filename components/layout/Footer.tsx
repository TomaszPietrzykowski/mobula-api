import Link from "next/link"
import styles from '../../styles/Footer.module.css'


const Footer = (): JSX.Element => {
    return (
        <footer className={styles.root}>
            <nav>
                <ul className={styles.nav}>
                    <li><Link href="/"><a>Home</a></Link></li>
                    <li><Link href="/workspace"><a>Workspace</a></Link></li>
                    </ul>
                </nav>
        </footer>
    )
}

export default Footer
