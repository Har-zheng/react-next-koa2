import React from 'react'
import { Button } from 'antd'
import store from '../store/store'

import Router from 'next/router'
export default () =>{
function gotoTestB() {
  Router.push({
    pathname:'/a',
    query: {
      id:2
    }
  }, '/a/2')
}
// console.log(store)
 return (
 <div>
    <Button>Index</Button>
    <p>test</p>
 </div>
)}