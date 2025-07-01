// src/pages/AddBusiness.tsx
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AlertCircle, CheckCircle } from 'lucide-react'
import axios from 'axios'

export default function AddBusiness() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    imageUrl: '',
    website: '',
    services: '',
    description: '',
    accessKey: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validatePhone = (phone: string) => /^\d{10}$/.test(phone)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePhone(formData.phone)) {
      setMessage({ type: 'error', text: 'Phone number must be 10 digits' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const response = await axios.post(
        `http://localhost:8080/api/businesses?accessKey=${encodeURIComponent(formData.accessKey)}`,
        { ...formData, accessKey: undefined }
      )
      
      if (response.status === 200 || response.status === 201) {
        setMessage({ type: 'success', text: 'Business added successfully!' })
        setFormData({
          name: '',
          category: '',
          phone: '',
          email: '',
          city: '',
          address: '',
          imageUrl: '',
          website: '',
          services: '',
          description: '',
          accessKey: ''
        })
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text:
          error.response?.data?.message ||
          error.message ||
          'Failed to add business. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Add Business - Ustaad App</title>
        <meta
          name="description"
          content="Add your business to Ustaad App and reach more customers in your local area."
        />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Add Your Business</h1>

          {message && (
            <div
              className={`flex items-center p-4 mb-6 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['name', 'category', 'phone', 'email', 'city', 'website'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)} {['name', 'category', 'phone', 'city'].includes(field) ? '*' : ''}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    required={['name', 'category', 'phone', 'city'].includes(field)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            {['address', 'imageUrl'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field === 'imageUrl' ? 'Image URL' : 'Address'} {field === 'address' ? '*' : ''}
                </label>
                <input
                  type="text"
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  required={field === 'address'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}

            {['services', 'description'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <textarea
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  rows={field === 'description' ? 4 : 3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Access Key *</label>
              <input
                type="password"
                name="accessKey"
                value={formData.accessKey}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding Business...' : 'Add Business'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}