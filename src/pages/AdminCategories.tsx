import { Users, Building, TrendingUp } from 'lucide-react'

export default function AdminCategories() {
  const stats = {
    totalUsers: 10234,
    familyUsers: 9500,
    vendors: 734,
    familyWills: 3100,
    familyMemorials: 4800,
    familyFundraisers: 1150,
    vendorProducts: 450,
    vendorOrders: 890
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Categories</h1>
        <p className="text-gray-600">Breakdown of users by type and activity</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{stats.familyUsers.toLocaleString()}</h2>
              <p className="text-gray-600">Family Users</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-700">Wills Created</span>
              <span className="font-bold text-purple-600">{stats.familyWills.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-700">Memorials</span>
              <span className="font-bold text-purple-600">{stats.familyMemorials.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-700">Fundraisers</span>
              <span className="font-bold text-purple-600">{stats.familyFundraisers.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              {((stats.familyUsers / stats.totalUsers) * 100).toFixed(1)}% of total users
            </p>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{stats.vendors.toLocaleString()}</h2>
              <p className="text-gray-600">Vendors</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
              <span className="text-sm text-gray-700">Products Listed</span>
              <span className="font-bold text-amber-600">{stats.vendorProducts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
              <span className="text-sm text-gray-700">Orders Received</span>
              <span className="font-bold text-amber-600">{stats.vendorOrders.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
              <span className="text-sm text-gray-700">Avg Rating</span>
              <span className="font-bold text-amber-600">4.7/5.0</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              {((stats.vendors / stats.totalUsers) * 100).toFixed(1)}% of total users
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Growth Trends</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-purple-600">+23%</p>
            <p className="text-sm text-gray-600">Family Users (30 days)</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
            <TrendingUp className="w-8 h-8 text-amber-600 mb-2" />
            <p className="text-2xl font-bold text-amber-600">+15%</p>
            <p className="text-sm text-gray-600">Vendors (30 days)</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
            <TrendingUp className="w-8 h-8 text-emerald-600 mb-2" />
            <p className="text-2xl font-bold text-emerald-600">+31%</p>
            <p className="text-sm text-gray-600">Overall Activity (30 days)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
