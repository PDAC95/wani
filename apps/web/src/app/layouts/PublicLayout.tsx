/**
 * Public Layout
 * Layout for public pages (Home, Landing)
 */

import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <div className="min-h-screen">
      {/* Main Content - No Header */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default PublicLayout
