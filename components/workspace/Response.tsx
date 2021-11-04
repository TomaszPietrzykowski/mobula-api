import React from "react"
import { useTypedSelector } from "../../redux/hooks"
import styles from "../../styles/Request.module.css"

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

const Response = () => {
  const { response, error, success, loading } = useTypedSelector(
    (state) => state.requestSend
  )
  return (
    <div>
      <h4>Response</h4>
      {!loading && success ? (
        <main>
          <div className={styles.responseInfoContainer}>
            <div>
              status: {JSON.stringify(response.status)}{" "}
              {response.statusText || getStatusText(response)}
            </div>
            <div>
              time:{" "}
              {response.mobula.reqEndTime - response.config.mobula.reqStartTime}
              ms
            </div>
            <div>size: {"123"}ks</div>
          </div>
          <h5>Response Headers</h5>
          {Object.entries(response.headers).map(([key, value]) => (
            <div style={{ display: "flex" }} key={key}>
              <div style={{ marginRight: "2rem" }}>{key}</div>
              <div>{String(value)}</div>
            </div>
          ))}
          <h5>Response Body</h5>
          <p>{JSON.stringify(response.data)}</p>
        </main>
      ) : (
        !loading &&
        error && (
          <main>
            <div className={styles.responseInfoContainer}>
              <div>status code: {error.response?.status || "400"}</div>
              <div>status: {String(error.name)}</div>
              <div>
                time:{" "}
                {error.response?.mobula.reqEndTime -
                  error.response?.config.mobula.reqStartTime || ""}
                ms
              </div>
              <div>size: {"123"}ks</div>
            </div>
            <h5>Response Headers</h5>
            {Object.entries(error.config.headers).map(([key, value]) => (
              <div style={{ display: "flex" }} key={key}>
                <div style={{ marginRight: "2rem" }}>{key}</div>
                <div>{String(value)}</div>
              </div>
            ))}
            <br />
            <h5>Response Body</h5>
            <p>
              {String(error.name)}: {String(error.message)}
            </p>
            <br />
            <p>Stack:</p>
            <p>{String(error.stack)}</p>
            <p>{JSON.stringify(error.config)}</p>
          </main>
        )
      )}
    </div>
  )
}

export default Response
