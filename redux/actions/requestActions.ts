import * as constants from "../constants/requestConstants"
import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { Dispatch } from "redux"

export const sendRequest =
  (config: AxiosRequestConfig) => async (dispatch: Dispatch) => {
    dispatch({ type: constants.REQUEST_SEND_REQUEST })
    try {
      const res: AxiosResponse = await axios(config)
      dispatch({ type: constants.REQUEST_SEND_SUCCESS, payload: res })
    } catch (error) {
      dispatch({ type: constants.REQUEST_SEND_FAIL, payload: error })
    }
  }
