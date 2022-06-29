import axios from 'axios'
import { MobulaCollection, MobulaRequest, MobulaWorkspace } from '../../types'
import * as constants from '../constants/workspaceConstants'
import * as userConstants from '../constants/userConstants'
import * as envConstants from '../constants/envConstants'

export const createWorkspace =
  (workspace: MobulaWorkspace, user) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data }: any = await axios.post(
        `http://localhost:5000/api/workspace`,
        workspace,
        config
      )
      if (data) {
        dispatch({ type: userConstants.USER_LOGIN_REQUEST })
        dispatch({
          type: userConstants.USER_LOGIN_SUCCESS,
          payload: {
            ...user,
            workspaceActive: data._id,
          },
        })
        dispatch({
          type: constants.WORKSPACE_ACTIVE_SUCCESS,
          payload: { ...data },
        })
      }
    } catch (error) {
      dispatch({ type: constants.WORKSPACE_ACTIVE_FAIL, payload: error })
    }
  }

export const getWorkspace = (id: String, token) => async (dispatch) => {
  dispatch({ type: constants.WORKSPACE_ACTIVE_REQUEST })

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(
      `http://localhost:5000/api/workspace/${id}`,
      config
    )
    dispatch({ type: constants.WORKSPACE_ACTIVE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.WORKSPACE_ACTIVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteWorkspace = (id: string, user) => async (dispatch) => {
  dispatch({ type: constants.WORKSPACE_ACTIVE_REQUEST })
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    await axios.delete(`http://localhost:5000/api/workspace/${id}`, config)
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: {
        ...user,
        workspaces: user.workspaces.filter(
          (ws) => ws.toString() !== id.toString()
        ),
        workspaceActive: null,
      },
    })
    dispatch({ type: constants.WORKSPACE_UPDATE_RESET })
    dispatch({ type: envConstants.ENV_OPEN_RESET })
    dispatch({ type: constants.WORKSPACE_ACTIVE_RESET })
  } catch (error) {
    dispatch({
      type: constants.WORKSPACE_ACTIVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateWorkspace =
  (workspace: MobulaWorkspace, token: string) => async (dispatch) => {
    try {
      dispatch({ type: constants.WORKSPACE_UPDATE_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.put(
        `http://localhost:5000/api/workspace/${workspace._id}`,
        workspace,
        config
      )
      dispatch({ type: constants.WORKSPACE_UPDATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: constants.WORKSPACE_UPDATE_FAIL, payload: error })
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
    dispatch({
      type: constants.WORKSPACE_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addCollectionToWorkspace =
  (collection: MobulaCollection, current: MobulaWorkspace, token: string) =>
  async (dispatch) => {
    try {
      dispatch({ type: constants.WORKSPACE_ACTIVE_REQUEST })
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.post(
        `http://localhost:5000/api/collection`,
        collection,
        config
      )
      dispatch({
        type: constants.WORKSPACE_ACTIVE_SUCCESS,
        payload: { ...current, collections: [...current.collections, data] },
      })
    } catch (error) {
      dispatch({
        type: constants.WORKSPACE_ACTIVE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
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
        dispatch({
          type: constants.WORKSPACE_ACTIVE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
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
