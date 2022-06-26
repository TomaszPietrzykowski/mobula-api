import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createWorkspace } from '../../redux/actions/workspaceActions'

import { useTypedSelector } from '../../redux/hooks'
import styles from '../../styles/Workspace.module.css'

const NewWorkspaceModal = ({ closeModal }) => {
  const { workspace, loading, error } = useTypedSelector(
    (state) => state.workspaceActive
  )
  const { user } = useTypedSelector((state) => state.userLogin)
  const [name, setName] = useState<string>('')

  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      createWorkspace(
        {
          name: name,
          user: user._id as string,
          requests: [],
          openRequests: [],
          collections: [],
        },
        user
      )
    )
    closeModal()
  }

  return (
    <div className={styles.newRequestRoot}>
      <h1>Create new project</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Project name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit'>Create project</button>
        </form>
      </div>
    </div>
  )
}

export default NewWorkspaceModal
