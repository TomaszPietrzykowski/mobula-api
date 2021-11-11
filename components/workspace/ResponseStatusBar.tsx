import React from "react"
import styles from "../../styles/Request.module.css"
import getResponseSize from "../../utils/getResponseSize"

export interface IPropsResponseStatus {
  response: {
    status?: number
    statusText?: string
    data?: any
    config?: any
    mobula?: any
  }
}

const getStatusText = (response) => {
  if (Number(response.status) >= 200 && Number(response.status) < 300) {
    return "OK"
  } else if (response.status >= 300 && response.status < 400) {
    return "Redirect"
  } else if (response.status >= 400 && response.status < 500) {
    return "Fail"
  } else {
    return "Error"
  }
}
const ResponseStatusBar = ({ response }: IPropsResponseStatus): JSX.Element => {
  return (
    <div className={styles.responseInfoContainer}>
      <div>
        status: {JSON.stringify(response.status)}{" "}
        {response.statusText || getStatusText(response)}
      </div>
      {response.data.proxyTiming ? (
        <div>
          <span className={styles.timingSpan}>
            Total time:{" "}
            {response.mobula.reqEndTime - response.config.mobula.reqStartTime}{" "}
            ms
          </span>

          <span className={styles.timingSpan}>
            Request time: {response.data.proxyTiming}ms{" "}
          </span>
          <span className={styles.timingSpan}>
            Proxy delay:{" "}
            {response.mobula.reqEndTime -
              response.config.mobula.reqStartTime -
              response.data.proxyTiming}{" "}
            ms
          </span>
        </div>
      ) : (
        <div>
          <span className={styles.timingSpan}>
            Request time:{" "}
            {response.mobula.reqEndTime - response.config.mobula.reqStartTime}{" "}
            ms
          </span>
        </div>
      )}
      <div>Response size: {getResponseSize(response)}</div>
    </div>
  )
}

export default ResponseStatusBar
