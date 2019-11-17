
import createStore from '../store/store'
import { Component } from 'react'
const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

const getOrcreateStore = (initialState) => {
  if (isServer) {
    return createStore(initialState)
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default Comp => {
  class WithReduxApp extends Component {
    constructor(props) {
      super(props)
      // console.log(props)
      this.reduxStore = getOrcreateStore(props.initialReduxState)
    }
    render() {
      // const name = name + '123'
      const { Component, pageProps, ...rest } = this.props
      // console.log(Component, pageProps)
      if (pageProps) {
        pageProps.test = '123'
      }
      return <Comp Component={Component} pageProps={pageProps} {...rest} reduxStore={this.reduxStore} />
    }
  }
  WithReduxApp.getInitialProps = async (ctx) => {

    let reduxStore
    if(isServer){
      const { req } = ctx.ctx
      const session = req.session
      if(session && session.userInfo){
        reduxStore = getOrcreateStore({
          user: session.userInfo
        })
      }else{ 
        reduxStore = getOrcreateStore()
      }
    }else{
      reduxStore = getOrcreateStore()
    }
    ctx.reduxStore = reduxStore
    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx)
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    }
  }
  return WithReduxApp
}