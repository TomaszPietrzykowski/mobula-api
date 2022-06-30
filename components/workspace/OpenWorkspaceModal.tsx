import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  getAllWorkspaces,
  getWorkspace,
} from '../../redux/actions/workspaceActions'

import { useTypedSelector } from '../../redux/hooks'
import styles from '../../styles/Workspace.module.css'

const OpenWorkspaceModal = ({ closeModal, handleNewProject }) => {
  const { workspaces, loading, error } = useTypedSelector(
    (state) => state.workspaceAll
  )
  const { user } = useTypedSelector((state) => state.userLogin)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllWorkspaces(user._id))
  }, [])

  return (
    <div className={styles.newRequestRoot}>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div>
          <h1>Open project</h1>
          <ul>
            <li
              onClick={() => {
                handleNewProject()
                closeModal()
              }}
            >
              create new project
            </li>
            {workspaces &&
              workspaces.map((ws) => (
                <li
                  key={ws._id}
                  id={ws._id}
                  onClick={() => {
                    dispatch(getWorkspace(ws._id, user))
                    closeModal()
                  }}
                >
                  {ws.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default OpenWorkspaceModal
