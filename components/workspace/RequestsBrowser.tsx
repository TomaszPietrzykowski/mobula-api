import React, { useEffect, useState } from "react"
import styles from "../../styles/RequestsBrowser.module.css"
import Request from "../request/Request"
// types
import { MobulaRequest, RequestsBrowserProps } from "../../types/index"

const RequestsBrowser = (props: RequestsBrowserProps): JSX.Element => {
  const [selectedRequest, setSelectedRequest] = useState<string>(
    props.selectedRequest
      ? props.selectedRequest.id
      : props.requests.length > 0
      ? props.requests[0].id
      : ""
  )

  return (
    <div>
      <h1>Open requests</h1>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <ul className={styles.tabs}>
            {props.requests.length > 0 &&
              props.requests.map((request: MobulaRequest) => (
                <li
                  className={
                    request.id === selectedRequest
                      ? styles.tabActiv
                      : styles.tabInactive
                  }
                >
                  {request.reqMethod}
                  {request.id}
                </li>
              ))}
            <li>+</li>
          </ul>
        </nav>
        <div className={styles.viewport}>
          {props.requests.length > 0 ? (
            <Request request={props.requests[0]} />
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
