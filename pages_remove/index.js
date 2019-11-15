import { useEffect } from 'react'
import axios from 'axios'
import { Button } from 'antd'
import {add} from '../store/store'
import { connect } from 'react-redux'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
 
import Router from 'next/router'
const Index =  ({counter, username,rename,add}) =>{
function gotoTestB() {
  Router.push({
    pathname:'/a',
    query: {
      id:2
    }
  }, '/a/2')
}
// console.log(store)
useEffect(() => {
  axios.get('/api/user/info').then(res => {
    console.log(res)
  })
}, [])
 return (
 <div>
    <Button>Index</Button>
    <p>count{ counter }</p>
    <p>userName{ username }</p>
    <input value={username} onChange={ (e) => rename(e.target.value) } />
    <button onClick={()=> add(counter)}>do add</button>
    <a href={ publicRuntimeConfig.OAUTH_URL }> 去登陆 </a>
 </div>
)}
Index.getInitialProps = async ({reduxStore}) => {
  reduxStore.dispatch(add(3))
  return{}
}
// connect 接受两个参数
const mapStateProps = (state)=> (
   {
    counter: state.counter.count,
    username: state.user.username
  })

const  mapStateDispath = (dispatch) => {
  return {
    add: (num) => dispatch({type: 'ADD', num}),
    rename: (name) => dispatch({type: "UPDATE_USERNAME", name})
  }
}
export default connect( mapStateProps, mapStateDispath)(Index)
