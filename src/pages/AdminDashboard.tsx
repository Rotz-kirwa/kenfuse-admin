import { useState, useEffect } from 'react'
import { Users, Shield, Heart, TrendingUp, DollarSign, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

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

  useEffect(() => {
    setStats({
      totalUsers: 10234,
      familyUsers: 9500,
      vendors: 734,
      totalWills: 3200,
      totalMemorials: 5000,
      totalFundraisers: 1200,
      totalContributions: 50000000
    })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of KENFUSE platform</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <h2 className="text-xl font-bold mb-4">User Categories</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Family Users</p>
            <p className="text-2xl font-bold text-purple-600">{stats.familyUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{((stats.familyUsers / stats.totalUsers) * 100).toFixed(1)}% of total</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Vendors</p>
            <p className="text-2xl font-bold text-amber-600">{stats.vendors.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{((stats.vendors / stats.totalUsers) * 100).toFixed(1)}% of total</p>
          </div>
        </div>
      </div>
    </div>
  )
}
