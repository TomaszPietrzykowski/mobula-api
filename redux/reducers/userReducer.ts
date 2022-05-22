import { AnyAction } from "redux"
import * as constants from "../constants/userConstants"

const initialState = {
  user: {},
  loading: false,
  error: null,
  success: false,
}

export const userLoginReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case constants.USER_LOGIN_REQUEST:
      return { ...state, loading: true }

    case constants.USER_LOGIN_SUCCESS:
      return { user: { ...action.payload }, loading: false, success: true }

    case constants.USER_LOGIN_FAIL:
      return { error: action.payload, loading: false, success: false }

    case constants.USER_LOGIN_RESET:
      return { ...state, user: {}, loading: false, success: false }

    default:
      return state
  }
}

export const userRegisterReducer = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case constants.USER_REGISTER_REQUEST:
      return { ...state, loading: true, success: false }

    case constants.USER_REGISTER_SUCCESS:
      return { user: { ...action.payload }, loading: false, success: true }

    case constants.USER_REGISTER_FAIL:
      return { error: action.payload, loading: false, success: false }

    case constants.USER_REGISTER_RESET:
      return { ...state, user: {}, success: false }

    default:
      return state
  }
}
