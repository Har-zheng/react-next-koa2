import { Button } from 'antd'
import { withRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
// import moment from 'moment'
const color = "#113366"
// 异步加载组件
const Comp =dynamic(import('../components/comp'))
const Title = styled.h1`
color: yellow;
font-size: 40px;
`
const a = ({ router, name,time }) => ( 
  <>
  <Title>Title { time }</Title>
  <Link href="aaa">
    <Button> <a href="aaa" className="link">{ router.query.id }{ name }</a></Button>
  </Link>
  <a href="aaa">test</a>
  <Comp></Comp>
  <style jsx>
    {
      `a { color: blue}
      .link { 
        color: ${color}
      }
    `}
  </style>
  <style jsx global>
    {`a { color: red}`}
  </style>
  </>
)

a.getInitialProps =async () => { // next.js封装的 服务端渲染的时候 就会执行这个方法
  const moment = await import('moment')
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'zhz',
        time: moment.default(Date.now() -60*1000).fromNow()
      })
    }, 1000);
  })
  return promise
}

export default withRouter(a)