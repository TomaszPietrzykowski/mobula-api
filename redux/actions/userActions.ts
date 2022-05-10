import axios from "axios"
import * as constants from "../constants/userConstants"

export const logIn = (email: String, password: String) => async (dispatch) => {
  dispatch({ type: constants.USER_LOGIN_REQUEST })
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      `http://localhost:5000/api/users/login`,
      { email, password },
      config
    )

    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: constants.USER_LOGIN_FAIL, payload: error })
  }
}
