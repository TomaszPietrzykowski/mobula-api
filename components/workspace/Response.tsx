import { AxiosResponse } from "axios"
import React from "react"
import { useSelector } from "react-redux"
import { useTypedSelector } from "../../redux/hooks"
import styles from "../../styles/Request.module.css"

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
            <div>status code: {JSON.stringify(response.status)}</div>
            <div>status: {JSON.stringify(response.statusText)}</div>
            <div>time: {"123"}ms</div>
          </div>
          <h5>Response Headers</h5>
          {Object.entries(response.headers).map(([key, value]) => (
            <div style={{ display: "flex" }}>
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
              <div>
                status code: {String(JSON.parse(JSON.stringify(error)).status)}
              </div>
              <div>status: {String(error.name)}</div>
              <div>time: {"123"}ms</div>
            </div>
            <h5>Response Headers</h5>
            {Object.entries(error.config.headers).map(([key, value]) => (
              <div style={{ display: "flex" }}>
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
