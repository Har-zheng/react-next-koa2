import React from 'react'
import { Button } from 'antd'
import Link from 'next/link'
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
  <Link href='/a?id=1' as='/a/1'>
    <Button>Index</Button>
  </Link>
  <Button onClick={gotoTestB}>test a router</Button>
 </div>
)}