import React, { FormEventHandler, useState } from "react"
import styles from "../styles/Workspace.module.css"

export interface KeyValuePair {
  key?: string
  value?: string
}

const Workspace = () => {
  const [activeTab, setActiveTab] = useState<string>("request")
  const [protocol, setProtocol] = useState<string>("http")
  const [reqUrl, setReqUrl] = useState<string>("example.com")
  const [reqHeaders, setReqHeaders] = useState<KeyValuePair[]>([])
  const [reqQueries, setReqQueries] = useState<KeyValuePair[]>([
    { key: "page", value: "1" },
  ])
  const [reqMethod, setReqMethod] = useState<string>("GET")
  const [output, setOutput] = useState<string>("")
  // form submit
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    let queriesString: string =
      reqQueries.length === 0
        ? ""
        : `?${reqQueries.map((q) => `${q.key}=${q.value}`).join("&")}`
    const requestUrl: string = `${protocol}://${reqUrl}${queriesString}`

    setOutput(`Method: ${reqMethod} URL: ${requestUrl}`)
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

  return (
    <div className={styles.root}>
      <h1>Workspace</h1>
      <form onSubmit={handleSubmit}>
        <select id="method" onChange={(e) => handleMethod(e)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        <select id="protocol" onChange={(e) => handleProtocol(e)}>
          <option value="http://">HTTP</option>
          <option value="https://">HTTPS</option>
          <option value="ftp://">FTP</option>
        </select>
        <input
          type="text"
          id="url"
          value={reqUrl}
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
      {activeTab === "request" ? (
        <article className={styles.output}>
          <p>Request</p>
          <p>{output}</p>
        </article>
      ) : (
        <article className={styles.output}>response</article>
      )}
    </div>
  )
}

export default Workspace
