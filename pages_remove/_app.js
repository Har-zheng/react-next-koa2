import 'antd/dist/antd.css'

import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'

import Layout from '../components/Layout.jsx'
import withRedux from '../lib/with-redux'

 class MyApp extends App {

  static async getInitialProps(ctx) {
    // console.log('app init') 
    
    const { Component } = ctx

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
        <Provider store={reduxStore}>
          <Layout> 
            <Component {...pageProps} />
          </Layout>
        </Provider>
    )
  }
}


export default withRedux(MyApp)

// <Button onClick={() => this.setState({ context: `${this.state.context}123456` })}>update  context</Button>