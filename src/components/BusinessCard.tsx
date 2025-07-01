import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { Business } from '../types'

interface BusinessCardProps {
  business: Business
}

const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image'

export default function BusinessCard({ business }: BusinessCardProps) {
  const imageUrl = business.imageUrl?.startsWith('http')
    ? business.imageUrl
    : `http://localhost:8080/uploads/${business.imageUrl}`

  return (
    <Link to={`/business/${business.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <img
          src={imageUrl || defaultImage}
          alt={business.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage
          }}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{business.name}</h3>
          <p className="text-blue-600 text-sm mb-1">{business.category}</p>

          <div className="flex items-center text-gray-600 text-sm mb-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{business.city}</span>
          </div>

          
        </div>
      </div>
    </Link>
  )
}
