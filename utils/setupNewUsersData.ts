import * as defaults from './defaults'
import axios from 'axios'

const newReq = async (request) => {
  const newReq = await axios.post(request)
  return newReq
}

const setupNewUsersWorkspace = async (userId: string) => {
  const workspaceBoilerplate = {
    userId,
    collections: [],
    requests: [],
    openRequests: [],
    environment: '',
  }
  const getAllTodos = await newReq(defaults.todos[0])
  const getTodo = await newReq(defaults.todos[1])
  const createNewTodo = await newReq(defaults.todos[2])

  // create resources
  return {
    ...workspaceBoilerplate,
    requests: [getAllTodos, getTodo, createNewTodo],
  }
}

export default setupNewUsersWorkspace
