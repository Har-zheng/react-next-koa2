import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

const userInitialState = {}

const LOGOUT = "LOGOUT"

const UPDATE_USERNAME = "UPDATE_USERNAME"
function userRducer(state = userInitialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
const allRefucers = combineReducers({
  user: userRducer
})


  // action creatore
export function logout(params) {
  return dispatch => {
    axios.post('/logout')
    .then(resp => {
      if(resp.status === 200){
        dispatch({
          type: LOGOUT
        })
      }else {
        console.log('logout failed', resp)
      }
    }).catch(err => {
      console.log('logout failed', err)
    })
  }
}

 const  initializeStore = (state)=>{
  const store = createStore(
    allRefucers,
    Object.assign({}, {
      user: userInitialState
    },state),
    composeWithDevTools(applyMiddleware(ReduxThunk))
    )
    return store
}
export default initializeStore
