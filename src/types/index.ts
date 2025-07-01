// src/types/index.ts (or wherever your types are)
export interface Business {
  id: number // assuming it's a number from backend (change to string if needed)
  name: string
  category: string
  phone: string
  email?: string
  city: string
  address: string
  imageUrl?: string
  website?: string
  services?: string
  description?: string
  avgRating: number
}
