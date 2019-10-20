import { createStore, combineReducers } from 'redux'

const initialState = {
  count: 0
}
const userInitialState ={
  username: 'zhz'
}

function countReducer(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case 'ADD':
      return {count: state.count+1}
    default:
      return state
  }
}
const UPDATE_USERNAME = "UPDATE_USERNAME"
function userRducer(state = userInitialState, action){
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
const store = createStore(allRefucers,{
  counter: initialState,
  user: userInitialState
})
// dispatch: ƒ dispatch(action)
// getState: ƒ getState()
// replaceReducer: ƒ replaceReducer(nextReducer)
// subscribe: ƒ subscribe(listener)
// Symbol(observable): ƒ observable()
store.dispatch({type: 'ADD'})
console.log(store.getState()) 
// 数据每次更新 会被调用
store.subscribe(() => {
  console.log('change', store.getState()) 
})
store.dispatch({type: 'ADD'})
store.dispatch({type: 'UPDATE_USERNAME', name: 'lanlan'})