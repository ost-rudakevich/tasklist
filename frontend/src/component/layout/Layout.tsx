import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'

const Layout: FC = () => {
  return (
    <div className='h-full flex flex-col bg-main-gray'>
      <Header />
      <div className='w-full overflow-y-auto px-10 py-7 flex justify-center'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
