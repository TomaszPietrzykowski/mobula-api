import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer'
import {
  envActiveReducer,
  envCreateReducer,
  envUpdateReducer,
} from './reducers/envReducers'
import {
  workspaceActiveReducer,
  workspaceAllReducer,
} from './reducers/workspaceReducer'

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  workspaceActive: workspaceActiveReducer,
  workspaceAll: workspaceAllReducer,
  envActive: envActiveReducer,
  envCreate: envCreateReducer,
  envUpdate: envUpdateReducer,
})

const initialState = {}
const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
