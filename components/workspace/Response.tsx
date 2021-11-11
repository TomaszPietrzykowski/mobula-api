import React from "react"
import { useTypedSelector } from "../../redux/hooks"
import styles from "../../styles/Request.module.css"
import ResponseHeaders from "../response/ResponseHeaders"
import BodyDisplay from "./BodyDisplay"
import ResponseStatusBar from "./ResponseStatusBar"

const Response = () => {
  const { response, error, success, loading } = useTypedSelector(
    (state) => state.requestSend
  )
  return (
    <div>
      <h4>Response</h4>
      {!loading && success && (
        <main>
          <ResponseStatusBar response={response} />
          <h5>Response Body</h5>
          {response.data.originalResponseHeaders &&
          response.data.originalData ? (
            <BodyDisplay value={JSON.stringify(response.data.originalData)} />
          ) : (
            <BodyDisplay value={JSON.stringify(response.data)} />
          )}
          <ResponseHeaders response={response} />
        </main>
        // TO DO --- check cors eror handling --------------------- TO DO
        // ) : (
        //   !loading &&
        //   error && (
        //     <main>
        //       <div className={styles.responseInfoContainer}>
        //         <div>status code: {error.response?.status || "400"}</div>
        //         <div>status: {String(error.name)}</div>
        //         <div>
        //           Error time:{" "}
        //           {error.response?.mobula.reqEndTime -
        //             error.response?.config.mobula.reqStartTime || ""}
        //           ms
        //         </div>
        //         <div>size: {"123"}ks</div>
        //       </div>
        //       <h5>Response Headers</h5>
        //       {Object.entries(error.config.headers).map(([key, value]) => (
        //         <div style={{ display: "flex" }} key={key}>
        //           <div style={{ marginRight: "2rem" }}>{key}</div>
        //           <div>{String(value)}</div>
        //         </div>
        //       ))}
        //       <br />
        //       <h5>Response Body</h5>
        //       <p>
        //         {String(error.name)}: {String(error.message)}
        //       </p>
        //       <br />
        //       <p>Stack:</p>
        //       <p>{String(error.stack)}</p>
        //       <p>{JSON.stringify(error.config)}</p>
        //     </main>
        //   )
      )}
      {!loading && !response.headers && <h2>Send request to see response</h2>}
    </div>
  )
}

export default Response
