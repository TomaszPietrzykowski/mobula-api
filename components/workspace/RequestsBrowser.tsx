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
                  {`${request.reqMethod}  ${request.reqName.slice(0, 12)}`}
                </li>
              ))}
            <li className={styles.tabInactive}>+</li>
          </ul>
        </nav>
        <div className={styles.viewport}>
          {props.requests.length > 0 ? (
            props.requests.map((request) => (
              <Request
                key={request._id}
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
