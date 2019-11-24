import { useState, useCallback } from 'react'
import getConfig from 'next/config'
import { connect } from 'react-redux'

import { Button, Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
const { Header, Content, Footer } = Layout

import Container from './Container'
import { logout } from '../store/store'
import axios from 'axios'

const { publicRuntimeConfig } = getConfig()

const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20,

}
const footerStyle = {
  textAlign: 'center'
}
const Comp = ({ color, children, style }) => <div style={{ color, ...style }}>{children}</div>


function MyLayout({ children, user, logout }) {

  const [search, setSearch] = useState('')
  const handleSearchChange = useCallback((event) => {
    setSearch(event, target.value)
  }, [setSearch])
  const handleLogout = useCallback(() => {
    logout()
  }, [logout])
  const handleGotoOAth = useCallback(()=> {
    axios.get(`/prepare-auth?`)
  },[])
  const userDropdown = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleLogout}>
          登出
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <Layout>
      <Header>
        <div className="header-inner">
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={githubIconStyle}></Icon>
            </div>
            <div>
              <Input.Search placeholder="搜索仓库" value={setSearch} onChange={handleSearchChange}  />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {

                user && user.id ? (
                  <Dropdown overlay={userDropdown}>
                    <a href="/">
                      <Avatar size={40} src={user.avatar_url}></Avatar>
                    </a>
                  </Dropdown>
                ) : (
                    <Tooltip title="点击进行登录">
                      <a href={publicRuntimeConfig.OAUTH_URL} onClick={handleGotoOAth}>
                        <Avatar size={40} icon='user'></Avatar>
                      </a>
                    </Tooltip>
                  )
              }
            </div>
          </div>
        </div>
      </Header>
      <Content>
        <Container renderer={<Comp color="red" style={{ fontSize: 40 }} />} >{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Develop  by ZHZ@
        <a href="47.101.169.213:5000"></a>
      </Footer>
      <style jsx>{`
      .content{
          color: red;
        }
        .header-inner{
          display:flex;
          justify-content: space-between;
        }
        .header-left{
          display:flex;
          justify-content: flex-start;
        }
      `}</style>
      <style jsx global>
        {`
        #__next{
          height: 100%;
        }
        .ant-layout{
          height: 100%;
        }
        .ant-layout-header{
          paddingLeft: 0;
          paddingRight: 0;
        }
        `}
      </style>
    </Layout>
  )
}
const mapstate = (state) => {
  return {
    user: state.user
  }
}
const mapReducer = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}
export default connect(mapstate, mapReducer)(MyLayout)