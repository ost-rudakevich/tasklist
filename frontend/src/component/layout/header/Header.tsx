import { FC } from 'react'
import UserPanel from './UserPanel'
import Logout from './Logout'

const Header: FC = () => {
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-700 pl-20 pr-14 pt-3'>
      <UserPanel />
      <Logout />
    </div>
  )
}

export default Header
