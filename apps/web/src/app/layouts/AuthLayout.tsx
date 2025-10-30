/**
 * Auth Layout
 * Layout for authentication pages (Login, Register)
 */

import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}

export default AuthLayout
