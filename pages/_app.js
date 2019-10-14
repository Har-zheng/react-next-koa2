import App from 'next/app'

import 'antd/dist/antd.css'

import Layout from '../components/Layout'

class MyApp extends App {
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
          <Component {...pageProps}></Component>
         </Layout>
       </div>
     )
   }
}


export default MyApp