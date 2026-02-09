import { useState, useEffect } from 'react'
import { Users, Shield, Heart, TrendingUp, DollarSign, Eye, UserPlus, Trash2, Ban, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    familyUsers: 0,
    vendors: 0,
    totalWills: 0,
    totalMemorials: 0,
    totalFundraisers: 0,
    totalContributions: 0
  })
  const [admins, setAdmins] = useState<any[]>([])
  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', phone: '', password: '', photo: '', status: 'active' })
  const [photoPreview, setPhotoPreview] = useState('')

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
        setNewAdmin({...newAdmin, photo: reader.result as string})
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    setStats({
      totalUsers: 0,
      familyUsers: 0,
      vendors: 0,
      totalWills: 0,
      totalMemorials: 0,
      totalFundraisers: 0,
      totalContributions: 0
    })
    setAdmins([])
  }, [])

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    const admin = { ...newAdmin, id: admins.length + 1, createdAt: new Date().toISOString().split('T')[0] }
    setAdmins([...admins, admin])
    setNewAdmin({ name: '', email: '', phone: '', password: '', photo: '', status: 'active' })
    setPhotoPreview('')
    setShowAddAdmin(false)
    toast.success('Admin added successfully!')
  }

  const handleSuspendAdmin = (id: number) => {
    setAdmins(admins.map(a => a.id === id ? {...a, status: a.status === 'suspended' ? 'active' : 'suspended'} : a))
    toast.success('Admin status updated!')
  }

  const handleBlockAdmin = (id: number) => {
    setAdmins(admins.map(a => a.id === id ? {...a, status: a.status === 'blocked' ? 'active' : 'blocked'} : a))
    toast.success('Admin status updated!')
  }

  const handleDeleteAdmin = (id: number) => {
    if (confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(a => a.id !== id))
      toast.success('Admin deleted successfully!')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of KENFUSE platform</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-12 h-12 text-purple-600 opacity-50" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-amber-50 to-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Wills</p>
              <p className="text-3xl font-bold text-amber-600">{stats.totalWills.toLocaleString()}</p>
            </div>
            <Shield className="w-12 h-12 text-amber-600 opacity-50" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-pink-50 to-pink-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Memorials</p>
              <p className="text-3xl font-bold text-pink-600">{stats.totalMemorials.toLocaleString()}</p>
            </div>
            <Heart className="w-12 h-12 text-pink-600 opacity-50" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Raised</p>
              <p className="text-3xl font-bold text-emerald-600">KSh {(stats.totalContributions / 1000000).toFixed(1)}M</p>
            </div>
            <DollarSign className="w-12 h-12 text-emerald-600 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/users" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold">Manage Users</h3>
              <p className="text-sm text-gray-600">View all registered users</p>
            </div>
          </div>
        </Link>

        <Link to="/categories" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold">User Categories</h3>
              <p className="text-sm text-gray-600">Family vs Vendor breakdown</p>
            </div>
          </div>
        </Link>

        <Link to="/contributions" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold">View Contributions</h3>
              <p className="text-sm text-gray-600">Track all donations</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Admin Accounts</h2>
          <button onClick={() => setShowAddAdmin(true)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add Admin
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Created</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {admin.photo ? (
                        <img src={admin.photo} alt={admin.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Shield className="w-5 h-5 text-red-600" />
                        </div>
                      )}
                      <span className="font-medium">{admin.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{admin.email}</td>
                  <td className="px-4 py-3 text-gray-600">{admin.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      admin.status === 'active' ? 'bg-green-100 text-green-700' :
                      admin.status === 'suspended' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {admin.status === 'active' ? 'Active' : admin.status === 'suspended' ? 'Suspended' : 'Blocked'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{admin.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleSuspendAdmin(admin.id)} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg" title={admin.status === 'suspended' ? 'Activate' : 'Suspend'}>
                        {admin.status === 'suspended' ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      </button>
                      <button onClick={() => handleBlockAdmin(admin.id)} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg" title={admin.status === 'blocked' ? 'Unblock' : 'Block'}>
                        <Ban className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteAdmin(admin.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {admins.length === 0 && (
            <p className="text-center py-8 text-gray-500">No admin accounts yet</p>
          )}
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAddAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Profile Photo</label>
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full px-4 py-2 border rounded-lg" />
                {photoPreview && (
                  <img src={photoPreview} alt="Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={newAdmin.name} onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" required className="w-full px-4 py-2 border rounded-lg" value={newAdmin.email} onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="tel" required className="w-full px-4 py-2 border rounded-lg" value={newAdmin.phone} onChange={(e) => setNewAdmin({...newAdmin, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input type="password" required className="w-full px-4 py-2 border rounded-lg" value={newAdmin.password} onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})} />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">Add Admin</button>
                <button type="button" onClick={() => setShowAddAdmin(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
