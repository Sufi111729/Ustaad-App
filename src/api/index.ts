// src/api.ts
import axios from 'axios'
import { Business } from '../types'

const API_BASE_URL = 'http://localhost:8080/api' // 🔁 Update to deployed URL in prod

const api = axios.create({
  baseURL: API_BASE_URL,
})

// 🔍 Search businesses by category or by category + city
export const searchBusinesses = async (
  category?: string,
  city?: string
): Promise<Business[]> => {
  try {
    let url = '/businesses'
    const params = new URLSearchParams()

    if (category && city) {
      url = '/businesses/search-by-city'
      params.append('category', category)
      params.append('city', city)
    } else if (category) {
      url = '/businesses/search'
      params.append('category', category)
    }

    const response = await api.get(`${url}?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error('❌ Error searching businesses:', error)
    return []
  }
}

// 🔍 Get a business by its ID (if you add this endpoint later)
export const getBusinessById = async (id: string): Promise<Business> => {
  try {
    const response = await api.get(`/businesses/${id}`) // optional
    return response.data
  } catch (error) {
    console.error('❌ Error fetching business:', error)
    throw error
  }
}

// 🌟 Get top-rated businesses
export const getTopRatedBusinesses = async (): Promise<Business[]> => {
  try {
    const response = await api.get('/businesses/top-rated')
    return response.data
  } catch (error) {
    console.error('❌ Error fetching top-rated businesses:', error)
    return []
  }
}

// ➕ Add a business with accessKey
export const addBusiness = async (businessData: any): Promise<void> => {
  try {
    const { accessKey, ...payload } = businessData
    await api.post(`/businesses?accessKey=${encodeURIComponent(accessKey)}`, payload)
  } catch (error: any) {
    console.error('❌ Error adding business:', error)
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Failed to add business')
    }
  }
}
