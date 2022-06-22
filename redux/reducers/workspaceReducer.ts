import { AnyAction } from 'redux'
import * as constants from '../constants/workspaceConstants'

const initialActiveWsState = {
  workspace: {
    requests: [],
    openRequests: [],
    selectedRequest: '',
    env: '',
  },
  loading: true,
  error: null,
}

const initialAllWsState = {
  workspaces: [],
  loading: false,
  error: null,
}

export const workspaceActiveReducer = (
  state = initialActiveWsState,
  action: AnyAction
) => {
  switch (action.type) {
    case constants.WORKSPACE_ACTIVE_REQUEST:
      return { ...state, loading: true }

    case constants.WORKSPACE_ACTIVE_SUCCESS:
      return { workspace: { ...action.payload }, loading: false }

    case constants.WORKSPACE_ACTIVE_FAIL:
      return { error: action.payload, loading: false }

    case constants.WORKSPACE_ACTIVE_RESET:
      return initialActiveWsState

    default:
      return state
  }
}

export const workspaceAllReducer = (
  state = initialAllWsState,
  action: AnyAction
) => {
  switch (action.type) {
    case constants.WORKSPACE_ALL_REQUEST:
      return { ...state, loading: true }

    case constants.WORKSPACE_ALL_SUCCESS:
      return { workspaces: [...action.payload], loading: false }

    case constants.WORKSPACE_ALL_FAIL:
      return { error: action.payload, loading: false }

    case constants.WORKSPACE_ALL_RESET:
      return { ...state, workspaces: [] }

    default:
      return state
  }
}
