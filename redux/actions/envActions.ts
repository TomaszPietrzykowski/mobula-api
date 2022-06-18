import axios from 'axios'
import { MobulaEnv } from '../../types'
import * as constants from '../constants/envConstants'
import { useTypedSelector } from '../hooks'

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

export const openEnv = (id: string) => async (dispatch) => {
  dispatch({ type: constants.ENV_OPEN_REQUEST })

  try {
    const { user } = useTypedSelector((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }
    const { data } = await axios.get(
      `http://localhost:5000/api/env/${id}`,
      config
    )

    dispatch({ type: constants.ENV_OPEN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: constants.ENV_OPEN_FAIL, payload: error })
  }
}

export const updateEnv = (env: MobulaEnv) => async (dispatch) => {
  dispatch({ type: constants.ENV_UPDATE_REQUEST })
  try {
    const { user } = useTypedSelector((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
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

export const deleteEnv = (id: string) => async (dispatch) => {
  dispatch({ type: constants.ENV_UPDATE_REQUEST })
  try {
    const { user } = useTypedSelector((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }
    await axios.delete(`http://localhost:5000/api/env/${id}`, config)
    dispatch({ type: constants.ENV_UPDATE_SUCCESS })
  } catch (error) {
    dispatch({ type: constants.ENV_UPDATE_FAIL, payload: error })
  }
}
