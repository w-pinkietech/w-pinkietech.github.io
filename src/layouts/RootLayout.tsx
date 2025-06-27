import { type FC } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout: FC = () => {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Outlet />
    </div>
  )
}

export default RootLayout
