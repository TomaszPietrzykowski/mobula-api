import { AnyAction } from 'redux'
import * as constants from "../constants/userConstants"

const initialState = {
  user: {},
  loading: false,
  error: null
}

export const userLoginReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {

    case constants.USER_LOGIN_REQUEST:
      return {...state, loading: true}

    case constants.USER_LOGIN_SUCCESS:
      return {user: {...action.payload}, loading: false}

    case constants.USER_LOGIN_FAIL:
      return { error: action.payload, loading: false}

    case constants.USER_LOGIN_RESET:
      return {...state, user: {}}

    default:
      return state 
  }
}
