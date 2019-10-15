import React, { useState, useEffect, useReducer, useLayoutEffect } from 'react'

class MyCount extends React.Component {
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
    return <span>{this.state.count}</span>
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
  useLayoutEffect(()=> {
    console.log('Layout effect invoked')
    return () => console.log('Layout effect deteched')
  },[count])
  return (
    <>
      <button onClick={()=> dispatchCount({type: 'add'})}>{count}</button>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>

    </>
  )
}

export default MyCountFunc