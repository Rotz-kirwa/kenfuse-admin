import { useState, useEffect } from 'react'
import { Search, Filter, Plus, Edit, Trash2, ImagePlus } from 'lucide-react'
import { toast } from 'react-toastify'
import api from '../services/api'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  inStock: boolean
  rating: number
  reviews: number
  createdAt: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'FLOWERS',
    inStock: true
  })

  const categories = [
    { value: 'FLOWERS', label: 'Flowers' },
    { value: 'URNS', label: 'Urns' },
    { value: 'STATIONERY', label: 'Stationery' },
    { value: 'GIFTS', label: 'Gifts' },
    { value: 'SERVICES', label: 'Funeral Services' }
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setProducts(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
      toast.error('Failed to load products')
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || product.category === filter
    return matchesSearch && matchesFilter
  })

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price)
      }
      
      const response = await api.post('/products', productData)
      setProducts([...products, response.data.data])
      setNewProduct({ name: '', description: '', price: '', category: 'FLOWERS', inStock: true })
      setShowAddModal(false)
      toast.success('Product added successfully!')
    } catch (error) {
      console.error('Failed to add product:', error)
      toast.error('Failed to add product')
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`)
        setProducts(products.filter(p => p.id !== productId))
        toast.success('Product deleted successfully!')
      } catch (error) {
        console.error('Failed to delete product:', error)
        toast.error('Failed to delete product')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Management</h1>
          <p className="text-gray-600">Manage marketplace products and inventory</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or description..."
              className="input-field pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="input-field"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto responsive-table">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Created</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3" data-label="Name">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{product.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3" data-label="Category">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {categories.find(c => c.value === product.category)?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600" data-label="Price">KSh {product.price.toLocaleString()}</td>
                  <td className="px-4 py-3" data-label="Stock">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600" data-label="Created">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3" data-label="Actions">
                    <div className="flex gap-2 justify-end sm:justify-start">
                      <button onClick={() => { setSelectedProduct(product); setShowEditModal(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No products found</p>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name *</label>
                <input type="text" required className="input-field" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea className="input-field" rows={3} value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (KES) *</label>
                <input type="number" required step="0.01" className="input-field" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category *</label>
                <select className="input-field" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={newProduct.inStock} onChange={(e) => setNewProduct({...newProduct, inStock: e.target.checked})} />
                  <span className="text-sm font-medium">In Stock</span>
                </label>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">Add Product</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
