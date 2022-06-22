import React from 'react'
import styles from '../../styles/RequestsBrowser.module.css'
import Request from '../request/Request'
import {
  openReqInWorkspace,
  removeReqFromBrowser,
} from '../../redux/actions/workspaceActions'
// types
import { MobulaRequest, RequestsBrowserProps } from '../../types/index'
import { useTypedSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'

const RequestsBrowser = (): JSX.Element => {
  const { workspace } = useTypedSelector((state) => state.workspaceActive)
  const { env } = useTypedSelector((state) => state.envActive)
  const { selectedRequest, openRequests } = useTypedSelector(
    (state) => state.workspaceActive.workspace
  )
  const dispatch = useDispatch()

  /*
   * browser actions handlers
   */
  const handleRequestSelect = (e) => {
    dispatch(openReqInWorkspace(e.target.id, workspace))
  }

  const handleRequestClose = (e) => {
    dispatch(removeReqFromBrowser(e.target.id, workspace))
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <ul className={styles.tabs}>
            {openRequests.length > 0 &&
              openRequests.map((request: MobulaRequest) => (
                <li
                  key={request._id}
                  className={
                    request._id === selectedRequest
                      ? styles.tabActive
                      : styles.tabInactive
                  }
                >
                  <div
                    id={request._id}
                    className={styles.requestName}
                    onClick={handleRequestSelect}
                  >
                    {`${request.reqName}`}
                  </div>
                  <div
                    id={request._id}
                    onClick={handleRequestClose}
                    className={styles.close}
                  >
                    {' '}
                    x{' '}
                  </div>
                </li>
              ))}
            <li className={styles.tabInactive}>+</li>
          </ul>
        </nav>
        <div className={styles.viewport}>
          {openRequests.length > 0 ? (
            openRequests.map((request) => (
              <Request
                key={request._id}
                request={request}
                isSelected={request._id === selectedRequest}
              />
            ))
          ) : (
            <div className={styles.empty}>
              open existing or create <span>new request</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RequestsBrowser
