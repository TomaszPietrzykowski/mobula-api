import React, { useState, useEffect } from "react"
import { AxiosRequestConfig, Method } from "axios"
import { sendRequest } from "../../redux/actions/requestActions"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../redux/hooks"
import styles from "../../styles/Request.module.css"
import Response from "./Response"
import BodyEditor from "./BodyEditor"

const Request = () => {
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
  const [proxy, setProxy] = useState<boolean>(false)
  const [bodyEditorValue, setBodyEditorValue] = useState<string>("{\n\t\n}")
  const [requestNavState, setRequestNavState] = useState<number>(0)

  const { loading, error, response, success } = useTypedSelector(
    (state) => state.requestSend
  )

  const dispatch = useDispatch()

  /*
   * Axios request - execute
   */
  const proxyHeaders = (headers: {}): {} => {
    const proxyArray = Object.entries(headers).map(([key, value]) => {
      return { [`mobula-proxy-${[key]}`]: value }
    })
    let outputHeaders = {}
    proxyArray.forEach((obj) => {
      outputHeaders = { ...outputHeaders, ...obj }
    })
    return outputHeaders
  }
  const makeRequest = async () => {
    const requestUrl: string = proxy
      ? `${process.env.NEXT_PUBLIC_CORS_PROXY}${reqUrl}`
      : `${reqUrl}`
    const config: AxiosRequestConfig = {
      method: reqMethod,
      url: requestUrl,
      headers: proxy ? proxyHeaders(reqHeaders) : reqHeaders,
      params: reqQueries,
      validateStatus: (status) => status >= 100 && status < 600,
      data:
        reqMethod.toUpperCase() !== "GET" &&
        reqMethod.toUpperCase() !== "OPTIONS"
          ? JSON.parse(bodyEditorValue) || {}
          : null,
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
  const handleUrl = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setReqUrl(e.currentTarget.value)
  }
  const handleMethod = (e: any): void => {
    setReqMethod(e.currentTarget.value)
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
          <option value="OPTIONS">OPTIONS</option>
          <option value="HEAD">HEAD</option>
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
      <section className={styles.styledProxy}>
        <div
          className={proxy ? styles.proxyBtnActive : styles.proxyBtn}
          onClick={() => setProxy(!proxy)}
        >
          Proxy
        </div>
      </section>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <article className={styles.output}>
          <h2>Request</h2>
          <nav className={styles.requestNav}>
            <ul>
              <li
                className={
                  requestNavState === 0 ? styles.navLiActive : styles.navLi
                }
                onClick={() => setRequestNavState(0)}
              >
                Request headers
              </li>
              <li
                className={
                  requestNavState === 1 ? styles.navLiActive : styles.navLi
                }
                onClick={() => setRequestNavState(1)}
              >
                Query Params
              </li>
              <li
                className={
                  requestNavState === 2 ? styles.navLiActive : styles.navLi
                }
                onClick={() => setRequestNavState(2)}
              >
                JSON Body
              </li>
            </ul>
          </nav>
          {requestNavState === 0 ? (
            <section>
              <h3>Request Headers</h3>
              {Object.entries(reqHeaders).map(([key, value]) => (
                <div style={{ display: "flex" }} key={key}>
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
          ) : requestNavState === 1 ? (
            <section>
              <h3>Query Params</h3>
              {Object.entries(reqQueries).map(([key, value]) => (
                <div style={{ display: "flex" }} key={key}>
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
          ) : (
            <BodyEditor value={bodyEditorValue} onChange={setBodyEditorValue} />
          )}
          <Response />
        </article>
      )}
    </div>
  )
}

export default Request
