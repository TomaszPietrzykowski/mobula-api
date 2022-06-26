import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  addCollectionToWorkspace,
  updateWorkspace,
} from '../../redux/actions/workspaceActions'
import {
  WORKSPACE_ACTIVE_REQUEST,
  WORKSPACE_ACTIVE_SUCCESS,
} from '../../redux/constants/workspaceConstants'
import { useTypedSelector } from '../../redux/hooks'
import styles from '../../styles/Workspace.module.css'

const AddCollectionModal = ({ closeModal }) => {
  const { workspace, loading, error } = useTypedSelector(
    (state) => state.workspaceActive
  )
  const { user } = useTypedSelector((state) => state.userLogin)
  const [name, setName] = useState<string>('')

  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: WORKSPACE_ACTIVE_REQUEST })
    dispatch(
      addCollectionToWorkspace(
        { name: name, user: user._id, workspace: workspace._id, requests: [] },
        workspace,
        user.token
      )
    )
    closeModal()
  }

  return (
    <div className={styles.newRequestRoot}>
      <h1>Create new folder</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit'>Add folder</button>
        </form>
      </div>
    </div>
  )
}

export default AddCollectionModal
