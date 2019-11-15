import { Button,Layout,Icon } from 'antd'
const {Header, Content, Footer } = Layout
export default ({ children }) => (
<Layout>
  <Header>
    <div className="header-left">
      <div className="logo">
        <Icon type="github"></Icon>
      </div>
    </div>
  </Header>
  <Content>{ children}</Content>
  <Footer>
    Develop  by ZHZ@
    <a href="47.101.169.213:5000"></a>
  </Footer>
</Layout>
)