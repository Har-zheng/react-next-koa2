import Document , { Html, Head,Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
// function withLog(Comp){
//   return (props) => {
//     console.log(props)
//     return <Comp {...props}/>
//   }
// }
class MyDocument extends Document {

  static async getInitialProps(ctx){
    const sheet = new ServerStyleSheet()
    // ctx.renderPage = () => {}
    const originalRenderPage = ctx.renderPage
    // console.log(ctx)
    try{
      // console.log(ctx)
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => (props) => sheet.collectStyles(<App {...props}></App>)
      })
      const props = await Document.getInitialProps(ctx)
      return {
        ...props,
        styles: <>{props.styles}{sheet.getStyleElement()}</>
      }
    } finally{
      sheet.seal()
    }
  }
  render(){
      return <Html>
        <Head>
          <style>
            {`.test {color: red}`}
          </style>
        </Head>
        <body className="test">
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
  }
}
export default MyDocument