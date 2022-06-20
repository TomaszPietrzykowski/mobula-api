import axios from 'axios'
import { MobulaEnv } from '../../types'
import * as constants from '../constants/envConstants'

export const createEnv = (env: MobulaEnv) => async (dispatch) => {
  dispatch({ type: constants.ENV_CREATE_REQUEST })
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      `http://localhost:5000/api/env`,
      env,
      config
    )

    dispatch({ type: constants.ENV_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: constants.ENV_CREATE_FAIL, payload: error })
  }
}

export const openEnv = (id: string, token: string) => async (dispatch) => {
  console.log(`Open env action called, token: ${token}`)
  dispatch({ type: constants.ENV_OPEN_REQUEST })
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(
      `http://localhost:5000/api/env/${id}`,
      config
    )
    console.log('response received', data)
    dispatch({ type: constants.ENV_OPEN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: constants.ENV_OPEN_FAIL, payload: error })
  }
}

export const updateEnv =
  (env: MobulaEnv, token: string) => async (dispatch) => {
    dispatch({ type: constants.ENV_UPDATE_REQUEST })
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.put(
        `http://localhost:5000/api/env/${env._id}`,
        env,
        config
      )

      dispatch({ type: constants.ENV_UPDATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: constants.ENV_UPDATE_FAIL, payload: error })
    }
  }

export const deleteEnv = (id: string, token: string) => async (dispatch) => {
  dispatch({ type: constants.ENV_UPDATE_REQUEST })
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    await axios.delete(`http://localhost:5000/api/env/${id}`, config)
    dispatch({ type: constants.ENV_UPDATE_SUCCESS })
  } catch (error) {
    dispatch({ type: constants.ENV_UPDATE_FAIL, payload: error })
  }
}
