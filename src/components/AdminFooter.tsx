import { Shield } from 'lucide-react'

export default function AdminFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-500" />
            <span className="font-bold text-white">KENFUSE Admin Panel</span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} KENFUSE. Admin Dashboard - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
