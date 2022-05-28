import React, { useState } from "react"
import styles from "../../styles/Workspace.module.css"

const CreateNewRequest: React.FC = () => {
  const [newReqName, setNewReqName] = useState<string>("New Request>")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(newReqName)
  }

  const handleNameChange = (e) => {
    setNewReqName(e.target.value)
  }
  return (
    <div className={styles.newRequestRoot}>
      <h1>Create New Request</h1>
      <p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newReqName}
            placeholder="name your request"
            onChange={handleNameChange}
          />
        </form>
      </p>
    </div>
  )
}

export default CreateNewRequest
