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

const EditCollectionModal = ({ closeModal }) => {
  const { workspace, loading, error } = useTypedSelector(
    (state) => state.workspaceActive
  )
  const { user } = useTypedSelector((state) => state.userLogin)
  const [name, setName] = useState<string>('')

  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: WORKSPACE_ACTIVE_REQUEST })

    // ----- TODO -- write logic

    // dispatch(
    //   addCollectionToWorkspace(
    //     { name: name, user: user._id, workspace: workspace._id, requests: [] },
    //     workspace,
    //     user.token
    //   )
    // )
    closeModal()
  }

  return (
    <div className={styles.newRequestRoot}>
      <h1>Edit folder name</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default EditCollectionModal
