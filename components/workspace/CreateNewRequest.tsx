import React, { useState } from 'react'
import { useTypedSelector } from '../../redux/hooks'
import styles from '../../styles/Workspace.module.css'

const CreateNewRequest = ({ selectedCollection }) => {
  const { workspace, loading, error } = useTypedSelector(
    (state) => state.workspaceActive
  )

  const [newReqName, setNewReqName] = useState<string>('New Request')
  const [currentCollection, setCurrentCollection] =
    useState<any>(selectedCollection)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(newReqName)
  }

  const handleCollectionChange = (e) => {
    const newCollection = [
      ...workspace.collections,
      { name: '../', _id: '1' },
    ].find((el) => el._id === e.target.value)
    setCurrentCollection(newCollection)
  }
  const handleNameChange = (e) => {
    setNewReqName(e.target.value)
  }
  return (
    <div className={styles.newRequestRoot}>
      <h1>Create New Request</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='cars'>Save in:</label>
          <select name='cars' id='cars' onChange={handleCollectionChange}>
            <option value={selectedCollection.name}>
              {selectedCollection.name}
            </option>
            {[...workspace.collections, { name: '../', _id: '1' }]
              .filter((col) => col._id !== selectedCollection._id)
              .map((col) => (
                <option value={col._id}>{col.name}</option>
              ))}
          </select>
          <input
            type='text'
            value={newReqName}
            placeholder='name your request'
            onChange={handleNameChange}
          />
        </form>
      </div>
    </div>
  )
}

export default CreateNewRequest
