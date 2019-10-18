import { createStore } from 'redux'

const initialState = {
  count: 0
}

function reducer(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case 'ADD':
      return {count: state.count+1}
    default:
      return state
  }
}
const store = createStore(reducer,initialState)
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