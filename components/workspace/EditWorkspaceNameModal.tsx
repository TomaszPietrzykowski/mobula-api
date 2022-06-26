import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateWorkspace } from '../../redux/actions/workspaceActions'
import {
  WORKSPACE_ACTIVE_REQUEST,
  WORKSPACE_ACTIVE_SUCCESS,
} from '../../redux/constants/workspaceConstants'
import { useTypedSelector } from '../../redux/hooks'
import styles from '../../styles/Workspace.module.css'

const EditWorkspaceNameModal = ({ closeModal }) => {
  const { workspace, loading, error } = useTypedSelector(
    (state) => state.workspaceActive
  )
  const { user } = useTypedSelector((state) => state.userLogin)
  const [name, setName] = useState<string>(workspace.name)

  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    console.log('submit called')
    e.preventDefault()
    dispatch({ type: WORKSPACE_ACTIVE_REQUEST })
    dispatch({
      type: WORKSPACE_ACTIVE_SUCCESS,
      payload: { ...workspace, name: name },
    })
    dispatch(updateWorkspace({ ...workspace, name: name }, user.token))
    closeModal()
  }

  return (
    <div className={styles.newRequestRoot}>
      <h1>Create New Request</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit'>save</button>
        </form>
      </div>
    </div>
  )
}

export default EditWorkspaceNameModal
