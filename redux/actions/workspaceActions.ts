import axios from 'axios'
import { MobulaRequest, MobulaWorkspace } from '../../types'
import * as constants from '../constants/workspaceConstants'

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

export const openReqInWorkspace =
  (id: String, current: MobulaWorkspace) => async (dispatch) => {
    if (
      current.openRequests.filter((r: MobulaRequest) => r._id === id).length > 0
    ) {
      if (current.selectedRequest === id) {
        return
      } else {
        dispatch({ type: constants.WORKSPACE_ACTIVE_REQUEST })
        dispatch({
          type: constants.WORKSPACE_ACTIVE_SUCCESS,
          payload: { ...current, selectedRequest: id },
        })
      }
    } else {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/request/${id}`
        )
        dispatch({
          type: constants.WORKSPACE_ACTIVE_SUCCESS,
          payload: {
            ...current,
            openRequests: [...current.openRequests, data],
            selectedRequest: id,
          },
        })
      } catch (error) {
        dispatch({ type: constants.WORKSPACE_ACTIVE_FAIL, payload: error })
      }
    }
  }

export const removeReqFromBrowser =
  (id: String, current: MobulaWorkspace) => async (dispatch) => {
    const filtered = current.openRequests.filter(
      (r: MobulaRequest) => r._id !== id
    )
    dispatch({
      type: constants.WORKSPACE_ACTIVE_SUCCESS,
      payload: {
        ...current,
        openRequests: filtered,
        selectedRequest:
          filtered.length > 0 ? filtered[filtered.length - 1]._id : '',
      },
    })
  }
