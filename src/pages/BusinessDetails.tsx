import  { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MapPin, Phone, Mail, Globe,  } from 'lucide-react'
import { Business } from '../types'
import { getBusinessById } from '../api'

export default function BusinessDetails() {
  const { id } = useParams<{ id: string }>()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchBusiness(id)
    }
  }, [id])

  const fetchBusiness = async (businessId: string) => {
    try {
      const data = await getBusinessById(businessId)
      setBusiness(data)
    } catch (error) {
      console.error('Error fetching business:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Business not found</p>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{business.name} - Ustaad App</title>
        <meta name="description" content={`Built with jdoodle.ai - ${business.description || `${business.name} in ${business.city}. Contact: ${business.phone}`}`} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={business.imageUrl}
            alt={business.name}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
                <p className="text-lg text-blue-600">{business.category}</p>
              </div>
             
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{business.address}, {business.city}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-2" />
                <span>{business.phone}</span>
              </div>
              
              {business.email && (
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{business.email}</span>
                </div>
              )}
              
              {business.website && (
                <div className="flex items-center text-gray-600">
                  <Globe className="w-5 h-5 mr-2" />
                  <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {business.website}
                  </a>
                </div>
              )}
            </div>

            {business.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-700">{business.description}</p>
              </div>
            )}

            {business.services && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Services</h2>
                <p className="text-gray-700">{business.services}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
 