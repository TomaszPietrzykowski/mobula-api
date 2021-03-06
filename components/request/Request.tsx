import React, { useState } from 'react'
import { useTypedSelector } from '../../redux/hooks'
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import styles from '../../styles/Request.module.css'
import Response from '../response/Response'
import BodyEditor from './BodyEditor'
import UrlPreview from './UrlPreview'
import markEnv from '../../utils/markEnv'
import parseEnv from '../../utils/parseEnv'
import getMethodColor from '../../utils/getMethodColor'

// extend axios types
declare module 'axios' {
  export interface AxiosRequestConfig {
    mobula?: {
      reqStartTime?: number
    }
  }
  export interface AxiosResponse {
    mobula?: {
      reqEndTime?: number
    }
  }
}

const Request = (props: { request: any; isSelected: Boolean }) => {
  const { env } = useTypedSelector((state) => state.envActive)
  /*
   * -----------  Component level state ---------------------
   */
  const [reqUrl, setReqUrl] = useState<string>(props.request.reqUrl)
  const [reqHeaders, setReqHeaders] = useState<{}>(
    props.request.reqHeaders || {}
  )
  const [newHeaderKey, setNewHeaderKey] = useState<string>('')
  const [newHeaderValue, setNewHeaderValue] = useState<string>('')
  const [reqQueries, setReqQueries] = useState<{}>(
    props.request.reqQueries || {}
  )
  const [newQueryKey, setNewQueryKey] = useState<string>('')
  const [newQueryValue, setNewQueryValue] = useState<string>('')
  const [reqMethod, setReqMethod] = useState<Method>(props.request.reqMethod)
  const [proxy, setProxy] = useState<boolean>(props.request.proxy)
  const [bodyEditorValue, setBodyEditorValue] = useState<string>('{\n\t\n}\n')
  const [requestNavState, setRequestNavState] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [response, setResponse] = useState<AxiosResponse | null>(null)
  const [isCorsError, setIsCorsError] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  /*
   * -----------  Axios request - E X E C U T E ---------------------
   */

  // 1. prefix custom headers
  // ------------------------

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

  // 2. request config
  // -----------------

  const makeRequest = async () => {
    const requestUrl: string = proxy
      ? `${process.env.NEXT_PUBLIC_CORS_PROXY}${reqUrl
          .replace('?', '<>')
          .replaceAll('&', '><')}`
      : `${reqUrl}`

    console.log(requestUrl)
    const config: AxiosRequestConfig = {
      method: reqMethod,
      url: parseEnv(requestUrl, env?.variables),
      headers: proxy ? proxyHeaders(reqHeaders) : reqHeaders,
      params: reqQueries,
      validateStatus: (status) => status >= 100 && status < 600,
      data:
        reqMethod.toUpperCase() !== 'GET' &&
        reqMethod.toUpperCase() !== 'HEAD' &&
        reqMethod.toUpperCase() !== 'OPTIONS'
          ? JSON.parse(bodyEditorValue) || {}
          : null,
    }
    sendRequest(config)
  }

  // 3. send request exec
  // --------------------

  const sendRequest = async (config: AxiosRequestConfig) => {
    setLoading(true)
    setSuccess(false)
    setResponse(null)
    setIsCorsError(false)
    try {
      axios.interceptors.request.use((req) => {
        req.mobula = req.mobula || {}
        req.mobula.reqStartTime = new Date().getTime()
        return req
      })
      axios.interceptors.response.use(
        (res) => {
          res.mobula = res.mobula || {}
          res.mobula.reqEndTime = new Date().getTime()
          return res
        },
        (err) => {
          if (typeof err.response === 'undefined') setIsCorsError(true)
          return Promise.reject(err)
        }
      )
      const res: AxiosResponse = await axios(config)
      setResponse(res)
      setSuccess(true)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  /*
   * ------------ Form submit handler - send request --------
   */
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    makeRequest()
  }

  /*
   * URL form state handlers
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
    if (newHeaderKey === '' || newHeaderValue === '') return
    setReqHeaders({ ...reqHeaders, [newHeaderKey]: newHeaderValue })
    setNewHeaderKey('')
    setNewHeaderValue('')
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
    if (newQueryKey === '' || newQueryValue === '') return
    setReqQueries({ ...reqQueries, [newQueryKey]: newQueryValue })
    setNewQueryKey('')
    setNewQueryValue('')
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

  const v = props.isSelected ? 'block' : 'none'

  // ------------- JSX --------------------------

  return (
    <div className={styles.root} style={{ display: v }}>
      <form onSubmit={handleSubmit} className={styles.urlForm}>
        <div className={styles.selectWrapper}>
          <select
            id='method'
            onChange={(e) => handleMethod(e)}
            className={styles.select}
            style={getMethodColor(reqMethod)}
          >
            <option value={reqMethod}>{reqMethod}</option>
            {['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS', 'HEAD']
              .filter((m) => m !== reqMethod)
              .map((m) => (
                <option value={m} key={m}>
                  {m}
                </option>
              ))}
          </select>
          <span className={styles.customArrow}></span>
        </div>
        <div className={styles.urlWrapper}>
          <input
            type='text'
            id='url'
            value={reqUrl}
            className={styles.url}
            onChange={(e) => handleUrl(e)}
          />
          <p
            className={styles.urlMask}
            dangerouslySetInnerHTML={{ __html: markEnv(reqUrl, env.variables) }}
          ></p>
        </div>
        <button type='submit' className={styles.sendBtn}>
          Send
        </button>
      </form>
      <UrlPreview url={reqUrl} queryParams={reqQueries} env={env.variables} />
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
                <div style={{ display: 'flex' }} key={key}>
                  <div style={{ marginRight: '2rem' }}>{key}</div>
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
                  type='text'
                  id='new-header-key'
                  value={newHeaderKey}
                  onChange={handleNewHeaderKey}
                  className={styles.headerInput}
                />
                <input
                  type='text'
                  id='new-header-value'
                  value={newHeaderValue}
                  onChange={handleNewHeaderValue}
                  className={styles.headerInput}
                />

                <button type='submit'>Add header</button>
              </form>
            </section>
          ) : requestNavState === 1 ? (
            <section>
              <h3>Query Params</h3>
              {Object.entries(reqQueries).map(([key, value]) => (
                <div style={{ display: 'flex' }} key={key}>
                  <div style={{ marginRight: '2rem' }}>{key}</div>
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
                  type='text'
                  value={newQueryKey}
                  onChange={handleNewQueryKey}
                  className={styles.QueryInput}
                />
                <input
                  type='text'
                  value={newQueryValue}
                  onChange={handleNewQueryValue}
                  className={styles.QueryInput}
                />

                <button type='submit'>Add Query Param</button>
              </form>
            </section>
          ) : requestNavState === 2 ? (
            <BodyEditor value={bodyEditorValue} onChange={setBodyEditorValue} />
          ) : requestNavState === 3 ? (
            <section>
              <h3>Cookies</h3>
            </section>
          ) : (
            <section>
              <h3>cURL</h3>
            </section>
          )}
          {!loading && !response?.headers && (
            <h2>Send request to see more details</h2>
          )}
          {!loading && response && <Response response={response} />}

          {
            // TO DO --- check cors error handling --------------------- TO DO
            !loading && isCorsError && (
              <main>
                <h2>Request could not be sent</h2>
                <p>
                  It may be a CORS issue or connection problem. Try using PROXY
                  for cross origin secured resources and check your internet
                  connection
                </p>
                <div className={styles.responseInfoContainer}>
                  <div>status code: {error?.response?.status || '400'}</div>
                  <div>status: {String(error?.name)}</div>
                  <div>
                    Error time:{' '}
                    {error.response?.mobula.reqEndTime -
                      error.response?.config.mobula.reqStartTime || ''}
                    ms
                  </div>
                  <div>size: {'123'}ks</div>
                </div>
                <h5>Response Headers</h5>
                {Object.entries(error.config.headers).map(([key, value]) => (
                  <div style={{ display: 'flex' }} key={key}>
                    <div style={{ marginRight: '2rem' }}>{key}</div>
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
          }
        </article>
      )}
    </div>
  )
}

export default Request
