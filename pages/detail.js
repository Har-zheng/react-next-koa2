import { resolve } from "_any-promise@1.3.0@any-promise"


function Detail() {
  return <span>detail</span>
  
}
Detail.getInitialProps =  () =>{
  return new Promise((resolve)=>{
    setTimeout(() => {
      resolve({})
    }, 1000);
  })
}


export default Detail