import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const initialState = {
  count: 0
}
const userInitialState = {
  username: 'zhz'
}
const ADD = 'ADD'
function countReducer(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case ADD:
      return { count: state.count + action.num }
    default:
      return state
  }
}
const UPDATE_USERNAME = "UPDATE_USERNAME"
function userRducer(state = userInitialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.name
      }
    default:
      return state;
  }
}
const allRefucers = combineReducers({
  counter: countReducer,
  user: userRducer
})


  // action creatore
  export function add(num){
    return {
      type: ADD,
      num,
    }
  }

  function addAsync(num) {
    console.log(num)
    return (dispatch) => {
      setTimeout(() => {
        dispatch(add(num))
      }, 1000)
    }
  }

  // store.dispatch(add(3))
// dispatch: ƒ dispatch(action)
// getState: ƒ getState()
// replaceReducer: ƒ replaceReducer(nextReducer)
// subscribe: ƒ subscribe(listener)
// Symbol(observable): ƒ observable()
// store.dispatch({ type: 'ADD' })
// store.dispatch(addAsync(5))
// console.log(store.getState())
// // 数据每次更新 会被调用
// store.subscribe(() => {
//   console.log('change', store.getState())
// })
// store.dispatch({ type: 'ADD' })
// store.dispatch({ type: 'UPDATE_USERNAME', name: 'lanlan' })
 const  initializeStore = (state)=>{
  const store = createStore(
    allRefucers,
    Object.assign({}, {
      counter: initialState,
      user: userInitialState
    },state),
    composeWithDevTools(applyMiddleware(ReduxThunk))
    )
    return store
}
export default initializeStore
