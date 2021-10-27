import React, { useState, useEffect } from "react"
import { AxiosRequestConfig, Method } from "axios"
import { sendRequest } from "../../redux/actions/requestActions"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../redux/hooks"
import styles from "../../styles/Request.module.css"

export interface KeyValuePair {
  key?: string
  value?: string
}

const Request = () => {
  const [activeTab, setActiveTab] = useState<string>("request")
  const [protocol, setProtocol] = useState<string>("http")
  const [reqUrl, setReqUrl] = useState<string>(
    "jsonplaceholder.typicode.com/todos/1"
  )
  const [reqHeaders, setReqHeaders] = useState<KeyValuePair>({})
  const [reqQueries, setReqQueries] = useState<KeyValuePair>({})
  const [newHeaderKey, setNewHeaderKey] = useState<string>("")
  const [newHeaderValue, setNewHeaderValue] = useState<string>("")
  const [reqMethod, setReqMethod] = useState<Method>("GET")

  const { loading, error, response, success } = useTypedSelector(
    (state) => state.requestSend
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (success) {
      setActiveTab("response")
    }
  }, [success])

  // axios request
  const makeRequest = async () => {
    const config: AxiosRequestConfig = {
      method: reqMethod,
      url: `${protocol}://${reqUrl}`,
    }
    dispatch(sendRequest(config))
  }

  // form submit
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    makeRequest()
  }
  // state handlers
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
  const handleAddHeader = (e: React.SyntheticEvent): void => {
    console.log("handle submit called")
    e.preventDefault()
    const obj = { ...reqHeaders, [newHeaderKey]: newHeaderValue }
    setReqHeaders(obj)
  }
  const handleNewHeaderKey = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewHeaderKey(e.currentTarget.value)
  }
  const handleNewHeaderValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewHeaderValue(e.currentTarget.value)
  }
  return (
    <div>
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
            {Array(reqHeaders).map((header) => (
              <div style={{ display: "flex" }}>
                <div>{header.key}</div>
              </div>
            ))}
          </section>
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
        </article>
      ) : (
        <article className={styles.output}>
          <p>Response</p>
          <p>{JSON.stringify(response.data)}</p>
          <div>{JSON.stringify(response.headers)}</div>
          <div>{JSON.stringify(response.status)}</div>
          <div>{JSON.stringify(response)}</div>
        </article>
      )}
    </div>
  )
}

export default Request
