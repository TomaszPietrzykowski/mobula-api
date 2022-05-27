import React, { ReactEventHandler, useEffect, useState } from "react"
import styles from "../../styles/RequestsBrowser.module.css"
import Request from "../request/Request"
// types
import { MobulaRequest, RequestsBrowserProps } from "../../types/index"

const RequestsBrowser = (props: RequestsBrowserProps): JSX.Element => {
  const [selectedRequest, setSelectedRequest] = useState<string>(
    props.selectedRequest
  )

  const handleRequestSelect = (e) => {
    setSelectedRequest(e.target.id)
  }

  return (
    <div>
      <h1>Open requests</h1>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <ul className={styles.tabs}>
            {props.requests.length > 0 &&
              props.requests.map((request: MobulaRequest) => (
                <li
                  key={request._id}
                  className={
                    request._id === selectedRequest
                      ? styles.tabActive
                      : styles.tabInactive
                  }
                  id={request._id}
                  onClick={handleRequestSelect}
                >
                  {request.reqMethod}
                </li>
              ))}
            <li>+</li>
          </ul>
        </nav>
        <div className={styles.viewport}>
          {props.requests.length > 0 ? (
            // <Request request={props.requests[0]} env={[]} />
            props.requests.map((request) => (
              <Request
                request={request}
                env={[]}
                isSelected={request._id === selectedRequest}
              />
            ))
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
