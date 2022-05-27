import axios from "axios"
import * as constants from "../constants/workspaceConstants"

export const getWorkspace = (id: String) => async (dispatch) => {
  dispatch({ type: constants.WORKSPACE_ACTIVE_REQUEST })
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/workspace/${id}`
    )
    dispatch({ type: constants.WORKSPACE_ACTIVE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: constants.WORKSPACE_ACTIVE_FAIL, payload: error })
  }
}

export const getAllWorkspaces = (userId: String) => async (dispatch) => {
  dispatch({ type: constants.WORKSPACE_ALL_REQUEST })
  try {
    const workspace = await axios.get(
      `http://localhost:5000/api/workspace/getall/${userId}`
    )
    dispatch({ type: constants.WORKSPACE_ALL_SUCCESS, payload: workspace })
  } catch (error) {
    dispatch({ type: constants.WORKSPACE_ALL_FAIL, payload: error })
  }
}
