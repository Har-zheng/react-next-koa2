import { useState, useCallback } from 'react'
import { Button, Layout, Icon, Input,Avatar } from 'antd'
const { Header, Content, Footer } = Layout
export default ({ children }) => {

  const [search, setSearch] = useState('')
  const handleSearchChange = useCallback((event) => {
    setSearch(event, target.value)
  }, [setSearch])
  const handleOnSearch = useCallback(() => {

  }, [])
  return (
    <Layout>
      <Header>
        <div className="header-left">
          <div className="logo">
            <Icon type="github"></Icon>
          </div>
          <div>
            <Input.Search placeholder="搜索仓库" value={setSearch} onChange={handleSearchChange} onSearch={handleOnSearch} />
          </div>
        </div>
        <div className="header-right">
          <div className="user">
            <Avatar size={40} icon='user'></Avatar>
          </div>
        </div>
      </Header>
      <Content>{children}</Content>
      <Footer>
        Develop  by ZHZ@
        <a href="47.101.169.213:5000"></a>
      </Footer>
    </Layout>
  )
}