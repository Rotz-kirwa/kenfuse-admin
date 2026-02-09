import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import AdminFooter from './AdminFooter'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <AdminFooter />
    </div>
  )
}
