import React, { useState } from "react"
import styles from "../styles/Workspace.module.css"
import axios from "axios"
import { useTypedDispatch } from "../redux/hooks"

export interface KeyValuePair {
  key?: string
  value?: string
}
export interface RequestInterface {
  url: string
  method: any
  params?: {}
  headers?: {}
}

const Workspace = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("request")
  const [protocol, setProtocol] = useState<string>("http")
  const [reqUrl, setReqUrl] = useState<string>(
    "jsonplaceholder.typicode.com/todos/1"
  )
  const [reqHeaders, setReqHeaders] = useState<KeyValuePair[]>([])
  const [reqQueries, setReqQueries] = useState<KeyValuePair[]>([])
  const [reqMethod, setReqMethod] = useState<string>("GET")
  const [output, setOutput] = useState<string>("")

  const dispatch = useTypedDispatch()

  // axios request
  interface makeRequest {
    (p: string, url: string): Promise<any>
  }
  const makeRequest: makeRequest = async (p: string, url: string) => {
    const outputHeaders = {}
    reqHeaders.forEach((h) => {
      outputHeaders[`${h.key}`] = h.value
    })

    const outputParams = {}
    reqQueries.forEach((p) => {
      outputParams[`${p.key}`] = p.value
    })
    const axiosConfig: RequestInterface = {
      url: `${p}://${url}`,
      method: reqMethod,
      params: outputParams,
      headers: outputHeaders,
    }
    console.log(axiosConfig.url)
    setLoading(true)
    try {
      const { data } = await axios(axiosConfig)
      setOutput(JSON.stringify(data))
      setActiveTab("response")
      setLoading(false)
      return data
    } catch (error) {
      setOutput(JSON.stringify(error))
      setActiveTab("response")
      console.log(error)
      setLoading(false)
    }
  }
  // form submit
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    makeRequest(protocol, reqUrl)
  }
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

  const login = () => {
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: { name: "Brian", id: 222, email: "123@345.okm" },
    })
  }

  return (
    <div className={styles.root}>
      <h1>Workspace</h1>
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
      <section>
        <button onClick={login}>Dispatch login</button>
        <p>user</p>
      </section>
      {loading ? (
        <h1>Loading</h1>
      ) : activeTab === "request" ? (
        <article className={styles.output}>
          <p>Request</p>
        </article>
      ) : (
        <article className={styles.output}>
          <p>Response</p>
          <p>{output}</p>
        </article>
      )}
    </div>
  )
}

export default Workspace
