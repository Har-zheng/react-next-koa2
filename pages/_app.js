import App from 'next/app'

import 'antd/dist/antd.css'

import Layout from '../components/Layout'

class MyApp extends App {
  // 全局性的数据获取 _app 修改默认的app全局配置  每个组件切换时都会作用到
  static async getInitialProps({Component,ctx}){
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
     return (
       <div>
         <Layout>
          <Component {...pageProps}></Component>
         </Layout>
       </div>
     )
   }
}


export default MyApp