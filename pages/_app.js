import 'antd/dist/antd.css'

import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout.jsx'
import withRedux from '../lib/with-redux'
import PageLoading from '../components/PageLoading'
import axios from 'axios'
 class MyApp extends App {
   state ={
     context: 'value'
   }

   startLoading = ()=>{
     this.setState({
       loading: true
     })
   }
   stopLoading = ()=>{
     this.setState({
       loading: false
     })
   }

   componentDidMount(){
    Router.events.on('routeChangeStart',this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeCompError', this.stopLoading)
    axios.get('/github/search/repositories?q=react')
        .then(res => {
          console.log(res)
        })
   }
   componentWillUnmount(){
    Router.events.off('routeChangeStart',this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeCompError', this.stopLoading)
   }

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
          {this.state.loading ? <PageLoading/>: null}
          <Layout>
             <Link href='/'>
               <a>Index</a>
             </Link>
             <Link href='/detail'>
               <a>Detail</a>
             </Link>
            <Component {...pageProps} />
          </Layout>
        </Provider>
    )
  }
}

export default withRedux(MyApp)

// <Button onClick={() => this.setState({ context: `${this.state.context}123456` })}>update  context</Button>