import React, { useState, useEffect, useReducer, useLayoutEffect,useContext,useRef,memo,useMemo,useCallback } from 'react'

import MyContext from '../lib/my-context'
class MyCount extends React.Component {
  constructor() {
    super()
    this.ref = React.createRef()
  }
  state = {
    count: 0
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 2
      })
    }, 1000)
  }
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
  render() {
    return <span ref={this.ref}>{this.state.count}</span>
  }
}
function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}
function MyCountFunc() {
  // const [count, setCount] = useState(0) // 解构 赋值
  const [count, dispatchCount] = useReducer(countReducer, 0)
  const [name, setName] = useState('zhz useEffect')
  const context = useContext(MyContext)
  const config = useMemo(() => ({
    text: `count is ${count}`,
    color: count > 3 ? 'red' : 'blue'
  }), []) // [] 这里的数组和  useEffect中数组效果一样
  const inputRef = useRef()
  // setCount(1) 设置值
  // setCount(c => c+1) c 是在那一瞬间的值
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatchCount({ type: 'add' })
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, []) //1[] 先执行return  再执行代码块 如果传入空数组  只有在第一次加载  才执行
  // 
  useEffect(()=> {
    console.log('effect invoked')
    return () => console.log('effect deteched')
  },[]) //2 [] 里面传入的向  如果在这次传入的内容有改变  先执行effect deteched=> 再effect invoked

  // 组件的渲染之前调用的  
  useLayoutEffect(()=> {
    console.log(inputRef)
    console.log('Layout effect invoked')
    return () => console.log('Layout effect deteched')
  },[count])
  const handleButtonClick = useCallback(()=> dispatchCount({type: 'add'}),[])
  return (
    <>
      <input ref={inputRef} value={name} onChange={(e) => setName(e.target.value)}></input>
      <Child
        config={config}
        onButtonClick={handleButtonClick}
      ></Child>
      <p>{context}</p>
    </>
  )
}

const Child = memo(function Child({onButtonClick, config}){
  console.log('render click')
  return (
    <button onClick={onButtonClick} style={{color: config.color}}>
      {config.text}
    </button>
  )
})

export default MyCountFunc