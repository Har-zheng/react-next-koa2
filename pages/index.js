import React from 'react'
import { Button } from 'antd'

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
 return (
 <div>
    <Button>Index</Button>
    <p>test</p>
 </div>
)}