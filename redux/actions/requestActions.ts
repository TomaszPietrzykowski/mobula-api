import * as constants from "../constants/requestConstants"
import axios from "axios"

export const sendRequest =
  (method: string, url: string, config?: {}, body?: {}) => async (dispatch) => {
    dispatch({ type: constants.REQUEST_SEND_REQUEST })
    try {
      let res
      switch (method) {
        case "POST":
          res = await axios.post(url, body, config)
        case "PUT":
          res = await axios.put(url, body, config)
        case "PATCH":
          res = await axios.patch(url, body, config)
        case "DELETE":
          res = await axios.delete(url, body)
        default:
          res = await axios(url, config)
      }
      const data = res.data
      return dispatch({ type: constants.REQUEST_SEND_SUCCESS, payload: data })
    } catch (error) {
      return dispatch({ type: constants.REQUEST_SEND_FAIL, payload: error })
    }
  }
