import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  getStats: () => api.get('/admin/stats'),
  getVendorApplications: () => api.get('/admin/vendor-applications'),
  updateVendorStatus: (id: number, status: string) => api.patch(`/admin/vendor-applications/${id}`, { status }),
  getFundraisers: () => api.get('/fundraisers'),
  getContributions: () => api.get('/admin/contributions'),
  getWills: () => api.get('/wills'),
  getMemorials: () => api.get('/memorials'),
}

export default api
