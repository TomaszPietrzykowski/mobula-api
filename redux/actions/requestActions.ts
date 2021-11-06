import * as constants from "../constants/requestConstants"
import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { Dispatch } from "redux"

declare module "axios" {
  export interface AxiosRequestConfig {
    mobula?: {
      reqStartTime?: number
    }
  }
  export interface AxiosResponse {
    mobula?: {
      reqEndTime?: number
    }
  }
}

export const sendRequest =
  (config: AxiosRequestConfig) => async (dispatch: Dispatch) => {
    dispatch({ type: constants.REQUEST_SEND_REQUEST })
    try {
      axios.interceptors.request.use((req) => {
        req.mobula = req.mobula || {}
        req.mobula.reqStartTime = new Date().getTime()
        return req
      })
      axios.interceptors.response.use(
        (res) => {
          res.mobula = res.mobula || {}
          res.mobula.reqEndTime = new Date().getTime()
          return res
        },
        (err) => {
          if (typeof err.response === "undefined") {
            console.log(
              "Request could not be sent. This could be a CORS issue or a dropped internet connection. Consider using CORS PROXY and check your internet connection."
            )
          }
          return Promise.reject(err)
        }
      )
      const res: AxiosResponse = await axios(config)
      dispatch({ type: constants.REQUEST_SEND_SUCCESS, payload: res })
    } catch (error) {
      dispatch({ type: constants.REQUEST_SEND_FAIL, payload: error })
    }
  }
