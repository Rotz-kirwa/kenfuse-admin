import { useState, useEffect } from 'react'
import { Search, CheckCircle, XCircle, Clock, Building } from 'lucide-react'
import { toast } from 'react-toastify'

export default function AdminVendorApplications() {
  const [applications, setApplications] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Fetch from localStorage for now
    const saved = localStorage.getItem('vendor_applications')
    setApplications(saved ? JSON.parse(saved) : [])
  }, [])

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.businessName.toLowerCase().includes(search.toLowerCase()) || 
                         app.ownerName.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || app.status === filter
    return matchesSearch && matchesFilter
  })

  const handleApprove = (id: number) => {
    const updated = applications.map(a => a.id === id ? {...a, status: 'approved'} : a)
    setApplications(updated)
    localStorage.setItem('vendor_applications', JSON.stringify(updated))
    toast.success('Vendor application approved!')
  }

  const handleReject = (id: number) => {
    const updated = applications.map(a => a.id === id ? {...a, status: 'rejected'} : a)
    setApplications(updated)
    localStorage.setItem('vendor_applications', JSON.stringify(updated))
    toast.success('Vendor application rejected!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Vendor Applications</h1>
        <p className="text-gray-600">Review and manage vendor applications</p>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by business or owner name..."
              className="input-field pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="input-field" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div key={app.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{app.businessName}</h3>
                    <p className="text-sm text-gray-600">{app.ownerName}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  app.status === 'approved' ? 'bg-green-100 text-green-700' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {app.status === 'approved' ? 'Approved' : app.status === 'rejected' ? 'Rejected' : 'Pending'}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{app.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{app.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium capitalize">{app.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{app.location}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Description</p>
                <p className="text-sm">{app.description}</p>
              </div>

              {app.status === 'pending' && (
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(app.id)} className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button onClick={() => handleReject(app.id)} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <p className="text-center py-8 text-gray-500">No vendor applications found</p>
        )}
      </div>
    </div>
  )
}
