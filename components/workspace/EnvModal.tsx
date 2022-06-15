import React, { useState } from 'react'
import { useTypedSelector } from '../../redux/hooks'
import styles from '../../styles/Workspace.module.css'

const EnvModal = () => {
  const { workspace, loading, error } = useTypedSelector(
    (state) => state.workspaceActive
  )

  const [currentEnv, setcurrentEnv] = useState<object>(workspace.env[0])
  const [display, setDisplay] = useState<number>(0)

  const handleEdit = () => {
    setDisplay(1)
  }
  const handleSelect = () => {
    setDisplay(2)
  }
  const handleNew = () => {
    setDisplay(3)
  }

  return (
    <div className={styles.newRequestRoot}>
      <h1>Environment</h1>
      {display === 0 ? (
        <div>
          <div style={{ display: 'flex' }}>
            <span onClick={handleSelect}>Active env: {currentEnv}</span>
            <button onClick={handleSelect}>Change</button>
          </div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleNew}>New</button>
        </div>
      ) : display === 1 ? (
        <div>
          Variables and so on
          <button onClick={() => setDisplay(0)}> _X_ </button>
        </div>
      ) : display === 2 ? (
        <div>
          select list<button onClick={() => setDisplay(0)}> _X_ </button>
        </div>
      ) : (
        <div>
          new env<button onClick={() => setDisplay(0)}> _X_ </button>
        </div>
      )}
    </div>
  )
}

export default EnvModal
