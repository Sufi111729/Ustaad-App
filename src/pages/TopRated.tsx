import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import BusinessCard from '../components/BusinessCard'
import { Business } from '../types'
import axios from 'axios'

export default function TopRated() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTopRatedBusinesses()
  }, [])

  const fetchTopRatedBusinesses = async () => {
    try {
      const response = await axios.get<Business[]>('http://localhost:8080/api/businesses/top-rated')
      setBusinesses(response.data)
    } catch (error) {
      console.error('Error fetching top-rated businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Top Rated Businesses - Ustaad App</title>
        <meta
          name="description"
          content="Discover the highest rated local businesses in your area. Quality services and customer satisfaction guaranteed."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Top Rated Businesses</h1>
          <p className="text-lg text-gray-600">
            Discover the best businesses with highest customer ratings
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No top-rated businesses found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
