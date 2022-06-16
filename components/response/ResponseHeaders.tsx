import React from 'react'
import styles from '../../styles/Response.module.css'
import { js as beautify } from 'js-beautify'
import { ResponseStatusBarProps } from '../../types/index'

const ResponseHeaders = ({ response }: ResponseStatusBarProps): JSX.Element => {
  return (
    <div className={styles.root}>
      <h5 className={styles.h5}>Response Headers</h5>
      {response.data.originalResponseHeaders
        ? Object.entries(response.data.originalResponseHeaders).map(
            ([key, value]) => (
              <div className={styles.headersRow} key={key}>
                <div className={styles.headersCol}>{key}</div>
                <div className={styles.headersCol}>
                  {beautify(value, { intend_size: 2 })}
                </div>
              </div>
            )
          )
        : Object.entries(response.headers).map(([key, value]) => (
            <div className={styles.headersRow} key={key}>
              <div className={styles.headersCol}>{key}</div>
              <div className={styles.headersCol}>{String(value)}</div>
            </div>
          ))}
      {response.data.originalResponseHeaders && (
        <section>
          <h5 className={styles.h5}>Proxy headers</h5>
          {Object.entries(response.headers).map(([key, value]) => (
            <div className={styles.headersRow} key={key}>
              <div className={styles.headersCol}>{key}</div>
              <div className={styles.headersCol}>{beautify(String(value))}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default ResponseHeaders
