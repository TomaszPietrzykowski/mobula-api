import React from "react"
import styles from "../../styles/RequestsBrowser.module.css"
// types
import { RequestsBrowserProps } from "../../types/index"
import RequestD from "../request/RequestD"

const RequestsBrowser = (props: RequestsBrowserProps): JSX.Element => {
  return (
    <div>
      <h1>Open requests</h1>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>tabs</nav>
        <div className={styles.viewport}>
          {props.requests.length > 0 ? (
            <RequestD request={props.requests[0]} />
          ) : (
            <div className={styles.empty}>
              open existing or create <span>new request</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RequestsBrowser
