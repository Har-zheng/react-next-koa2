import App from 'next/app'

import 'antd/dist/antd.css'

import Layout from '../components/Layout'

import  MyContext from '../lib/my-context'
import { Button } from 'antd'

class MyApp extends App {
  state ={
    context: 'value'
  }
  // 全局性的数据获取 _app 修改默认的app全局配置  每个组件切换时都会作用到
  // nextjs内部封装的默认方法
  static async getInitialProps({Component,ctx}){
    console.log(Component)
    let pageProps
    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
       pageProps
    }

  }

   render() {
     const { Component, pageProps} = this.props
     console.log(pageProps)
     console.log(Component)
     return (
       <div>
         <Layout>
           <MyContext.Provider value={this.state.context}>
            <Component {...pageProps}></Component>
            <Button onClick={()=> this.setState({context: `${this.state.context}123456`})}>update  context</Button>
          </MyContext.Provider>
         </Layout>
       </div>
     )
   }
}


export default MyApp