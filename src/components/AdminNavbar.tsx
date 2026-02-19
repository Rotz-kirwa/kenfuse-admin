import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, LogOut, User, Settings } from 'lucide-react'

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const [showSettings, setShowSettings] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' })

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Users', path: '/users' },
    { name: 'Categories', path: '/categories' },
    { name: 'Contributions', path: '/contributions' }
  ]

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.new !== passwordData.confirm) {
      alert('Passwords do not match')
      return
    }
    alert('Password changed successfully')
    setShowPasswordModal(false)
    setPasswordData({ current: '', new: '', confirm: '' })
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    window.location.href = '/login'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">KENFUSE</span>
              <span className="block text-xs text-red-400">Admin Panel</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-red-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowSettings(!showSettings)} className="flex items-center gap-2 text-gray-300 hover:text-white">
                <User className="w-5 h-5" />
                <span>Admin</span>
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <button onClick={() => { setShowPasswordModal(true); setShowSettings(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Change Password
                  </button>
                </div>
              )}
            </div>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 bg-gray-800 rounded-lg p-2">
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="mt-12 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium ${
                  location.pathname === link.path ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button onClick={handleLogout} className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg mt-4">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input type="password" required className="w-full px-4 py-2 border rounded-lg" value={passwordData.current} onChange={(e) => setPasswordData({...passwordData, current: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input type="password" required className="w-full px-4 py-2 border rounded-lg" value={passwordData.new} onChange={(e) => setPasswordData({...passwordData, new: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input type="password" required className="w-full px-4 py-2 border rounded-lg" value={passwordData.confirm} onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})} />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">Change Password</button>
                <button type="button" onClick={() => { setShowPasswordModal(false); setPasswordData({ current: '', new: '', confirm: '' }); }} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  )
}
