import { Button } from 'antd'
import Link from 'next/link'
export default ({ children }) => (
  
  <header>
    <Link href='/a?id=1' as='/a/1'>
    <Button>Index</Button>
  </Link>
    <Link href='/b?id=2'>
    <Button>IndexB</Button>
  </Link>
  <div>
    {children}
  </div>
  </header>
)