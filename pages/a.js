import { Button } from 'antd'
import { withRouter } from 'next/router'

const a = ({ router, name }) => <Button>a{ router.query.id }{ name }</Button>

a.getInitialProps = () => { // next.js封装的 服务端渲染的时候 就会执行这个方法
  return {
    name: 'zhz'
  }
}

export default withRouter(a)