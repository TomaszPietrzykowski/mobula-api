import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducer'
import {
  workspaceActiveReducer,
  workspaceAllReducer,
} from './reducers/workspaceReducer'

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  workspaceActive: workspaceActiveReducer,
  workspaceAll: workspaceAllReducer,
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
