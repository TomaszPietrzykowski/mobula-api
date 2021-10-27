import React, { useState, useEffect } from "react"
import { AxiosRequestConfig, Method } from "axios"
import { sendRequest } from "../../redux/actions/requestActions"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../redux/hooks"
import styles from "../../styles/Request.module.css"
import Response from "./Response"

const Request = () => {
  const [activeTab, setActiveTab] = useState<string>("request")
  const [protocol, setProtocol] = useState<string>("http")
  const [reqUrl, setReqUrl] = useState<string>(
    "jsonplaceholder.typicode.com/todos/1"
  )
  const [reqHeaders, setReqHeaders] = useState<{}>({})
  const [newHeaderKey, setNewHeaderKey] = useState<string>("")
  const [newHeaderValue, setNewHeaderValue] = useState<string>("")
  const [reqQueries, setReqQueries] = useState<{}>({})
  const [newQueryKey, setNewQueryKey] = useState<string>("")
  const [newQueryValue, setNewQueryValue] = useState<string>("")
  const [reqMethod, setReqMethod] = useState<Method>("GET")

  const { loading, error, response, success } = useTypedSelector(
    (state) => state.requestSend
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (success || error) {
      setActiveTab("response")
    }
  }, [success, error])

  /*
   * Axios request - execute
   */
  const makeRequest = async () => {
    const config: AxiosRequestConfig = {
      method: reqMethod,
      url: `${protocol}://${reqUrl}`,
      headers: reqHeaders,
      params: reqQueries,
    }
    dispatch(sendRequest(config))
  }

  /*
   * Form submit handler - send request
   */
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    makeRequest()
  }

  /*
   * Form state handlers - component level state
   */
  const handleProtocol = (e: any): void => {
    setProtocol(e.currentTarget.value)
  }
  const handleUrl = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setReqUrl(e.currentTarget.value)
  }
  const handleMethod = (e: any): void => {
    setReqMethod(e.currentTarget.value)
  }
  const handleActivetab = (activeTab: string): void => {
    setActiveTab(activeTab)
  }

  /*
   * Add custom header
   */
  const handleAddHeader = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    if (newHeaderKey === "" || newHeaderValue === "") return
    setReqHeaders({ ...reqHeaders, [newHeaderKey]: newHeaderValue })
    setNewHeaderKey("")
    setNewHeaderValue("")
  }
  // new header form state
  const handleNewHeaderKey = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewHeaderKey(e.currentTarget.value)
  }
  const handleNewHeaderValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewHeaderValue(e.currentTarget.value)
  }

  /*
   * Add custom query param
   */
  const handleAddQuery = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    if (newQueryKey === "" || newQueryValue === "") return
    setReqQueries({ ...reqQueries, [newQueryKey]: newQueryValue })
    setNewQueryKey("")
    setNewQueryValue("")
  }
  // new query form state
  const handleNewQueryKey = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewQueryKey(e.currentTarget.value)
  }
  const handleNewQueryValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewQueryValue(e.currentTarget.value)
  }
  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit} className={styles.urlForm}>
        <select id="method" onChange={(e) => handleMethod(e)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        <select id="protocol" onChange={(e) => handleProtocol(e)}>
          <option value="http">HTTP</option>
          <option value="https">HTTPS</option>
          <option value="ftp">FTP</option>
        </select>
        <input
          type="text"
          id="url"
          value={reqUrl}
          className={styles.url}
          onChange={(e) => handleUrl(e)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <label>
          <input
            type="radio"
            value="request"
            name="request"
            onChange={(e) => handleActivetab("request")}
            checked={activeTab === "request"}
          />
          Request
        </label>
        <label>
          <input
            type="radio"
            value="response"
            name="response"
            onChange={(e) => handleActivetab("response")}
            checked={activeTab === "response"}
          />
          Response
        </label>
      </div>

      {loading ? (
        <h1>Loading</h1>
      ) : activeTab === "request" ? (
        <article className={styles.output}>
          <h2>Request</h2>
          <section>
            <h3>Request Headers</h3>
            {Object.entries(reqHeaders).map(([key, value]) => (
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "2rem" }}>{key}</div>
                <div>{String(value)}</div>
                <button
                  onClick={() => {
                    const newObj = { ...reqHeaders }
                    delete newObj[key]
                    setReqHeaders(newObj)
                  }}
                >
                  Nuke
                </button>
              </div>
            ))}
            <form onSubmit={handleAddHeader}>
              <input
                type="text"
                id="new-header-key"
                value={newHeaderKey}
                onChange={handleNewHeaderKey}
                className={styles.headerInput}
              />
              <input
                type="text"
                id="new-header-value"
                value={newHeaderValue}
                onChange={handleNewHeaderValue}
                className={styles.headerInput}
              />

              <button type="submit">Add header</button>
            </form>
          </section>
          <section>
            <h3>Query Params</h3>
            {Object.entries(reqQueries).map(([key, value]) => (
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "2rem" }}>{key}</div>
                <div>{String(value)}</div>
                <button
                  onClick={() => {
                    const newObj = { ...reqQueries }
                    delete newObj[key]
                    setReqQueries(newObj)
                  }}
                >
                  Nuke
                </button>
              </div>
            ))}
            <form onSubmit={handleAddQuery}>
              <input
                type="text"
                value={newQueryKey}
                onChange={handleNewQueryKey}
                className={styles.QueryInput}
              />
              <input
                type="text"
                value={newQueryValue}
                onChange={handleNewQueryValue}
                className={styles.QueryInput}
              />

              <button type="submit">Add Query Param</button>
            </form>
          </section>
        </article>
      ) : (
        <article className={styles.output}>
          <Response />
        </article>
      )}
    </div>
  )
}

export default Request
