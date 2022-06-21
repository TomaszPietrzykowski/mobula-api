import { AnyAction } from 'redux'
import * as constants from '../constants/envConstants'

const initialState = {
  env: { variables: [] },
  loading: false,
  error: null,
  success: false,
}

export const envCreateReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case constants.ENV_CREATE_REQUEST:
      return { ...state, loading: true }

    case constants.ENV_CREATE_SUCCESS:
      return { env: action.payload, loading: false, success: true }

    case constants.ENV_CREATE_FAIL:
      return { error: action.payload, loading: false, success: false }

    case constants.ENV_CREATE_RESET:
      return { ...initialState }

    default:
      return state
  }
}

export const envActiveReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case constants.ENV_OPEN_REQUEST:
      return { ...state, loading: true }

    case constants.ENV_OPEN_SUCCESS:
      return { env: action.payload, loading: false, success: true }

    case constants.ENV_OPEN_FAIL:
      return { error: action.payload, loading: false, success: false }

    case constants.ENV_OPEN_RESET:
      return { ...initialState }

    default:
      return state
  }
}

export const envUpdateReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case constants.ENV_UPDATE_REQUEST:
      return { ...state, loading: true }

    case constants.ENV_UPDATE_SUCCESS:
      return { env: action.payload, loading: false, success: true }

    case constants.ENV_UPDATE_FAIL:
      return { error: action.payload, loading: false, success: false }

    case constants.ENV_UPDATE_RESET:
      return { ...initialState }

    default:
      return state
  }
}

export const envDeleteReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case constants.ENV_DELETE_REQUEST:
      return { ...state, loading: true }

    case constants.ENV_DELETE_SUCCESS:
      return { ...state, loading: false, success: true }

    case constants.ENV_DELETE_FAIL:
      return { error: action.payload, loading: false, success: false }

    case constants.ENV_DELETE_RESET:
      return { ...initialState }

    default:
      return state
  }
}
