// src/pages/Home.tsx
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Search } from 'lucide-react'
import BusinessCard from '../components/BusinessCard'
import { Business } from '../types'
import axios from 'axios'

export default function Home() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBusinesses()
  }, [])

  const fetchBusinesses = async () => {
    setLoading(true)
    setError(null)

    try {
      let res
      if (category && city) {
        res = await axios.get('http://localhost:8080/api/businesses/search-by-city', {
          params: { category, city }
        })
      } else if (category) {
        res = await axios.get('http://localhost:8080/api/businesses/search', {
          params: { category }
        })
      } else {
        res = await axios.get('http://localhost:8080/api/businesses/all')
      }
      setBusinesses(res.data)
    } catch (err: any) {
      setError(err?.message || 'Failed to load businesses')
      setBusinesses([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchBusinesses()
  }

  return (
    <>
      <Helmet>
        <title>Ustaad App - Find Local Businesses</title>
        <meta
          name="description"
          content="Muhammad Sufiyan - Discover and connect with top-rated local businesses in your city. Find restaurants, services, and more."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Local Businesses</h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover the best businesses in your area
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Category (e.g., Restaurant, Salon)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">{error}</div>
        ) : businesses.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No businesses found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
