import * as constants from "../constants/requestConstants"

const initialState = {
  response: {},
  loading: false,
  error: null,
  success: false,
}

export const requestSendReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.REQUEST_SEND_REQUEST:
      return { ...state, loading: true }

    case constants.REQUEST_SEND_SUCCESS:
      return { response: { ...action.payload }, loading: false, success: true }

    case constants.REQUEST_SEND_FAIL:
      return { error: action.payload, loading: false, success: false }

    default:
      return state
  }
}
