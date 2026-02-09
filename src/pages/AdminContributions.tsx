import { useState, useEffect } from 'react'
import { Search, DollarSign, User, Heart } from 'lucide-react'

export default function AdminContributions() {
  const [contributions, setContributions] = useState<any[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setContributions([])
  }, [])

  const filteredContributions = contributions.filter(c =>
    c.donor.toLowerCase().includes(search.toLowerCase()) ||
    c.fundraiser.toLowerCase().includes(search.toLowerCase())
  )

  const totalAmount = filteredContributions.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Contributions Tracking</h1>
        <p className="text-gray-600">View all donations and their purposes</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Contributions</p>
              <p className="text-3xl font-bold text-emerald-600">KSh {totalAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="w-12 h-12 text-emerald-600 opacity-50" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Donors</p>
              <p className="text-3xl font-bold text-purple-600">{filteredContributions.length}</p>
            </div>
            <User className="w-12 h-12 text-purple-600 opacity-50" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-pink-50 to-pink-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Contribution</p>
              <p className="text-3xl font-bold text-pink-600">KSh {(totalAmount / filteredContributions.length).toFixed(0)}</p>
            </div>
            <Heart className="w-12 h-12 text-pink-600 opacity-50" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by donor or fundraiser..."
              className="input-field pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Donor</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Fundraiser</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Purpose</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredContributions.map((contribution) => (
                <tr key={contribution.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="font-medium">{contribution.donor}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-emerald-600">KSh {contribution.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{contribution.fundraiser}</td>
                  <td className="px-4 py-3 text-gray-600">{contribution.purpose}</td>
                  <td className="px-4 py-3 text-gray-600">{contribution.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredContributions.length} contributions
        </div>
      </div>
    </div>
  )
}
