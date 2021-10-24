import React, { useState, useEffect } from "react"
import styles from "../styles/Workspace.module.css"
import axios from "axios"
import { sendRequest } from "../redux/actions/requestActions"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../redux/hooks"
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
  const [activeTab, setActiveTab] = useState<string>("request")
  const [protocol, setProtocol] = useState<string>("http")
  const [reqUrl, setReqUrl] = useState<string>(
    "jsonplaceholder.typicode.com/todos/1"
  )
  // const [reqHeaders, setReqHeaders] = useState<KeyValuePair[]>([])
  // const [reqQueries, setReqQueries] = useState<KeyValuePair[]>([])
  const [reqMethod, setReqMethod] = useState<string>("GET")

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
  const makeRequest = async (
    method: string,
    url: string,
    config?: {},
    body?: {}
  ) => {
    dispatch(sendRequest(method, url, config, body))
  }

  // form submit
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    makeRequest(reqMethod, `${protocol}://${reqUrl}`)
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
          <p>{JSON.stringify(response)}</p>
        </article>
      )}
    </div>
  )
}

export default Workspace
