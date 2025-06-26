import { type FC } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout: FC = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Outlet />
    </div>
  )
}

export default RootLayout
