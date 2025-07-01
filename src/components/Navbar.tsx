import { Link, useLocation } from 'react-router-dom'
import { Home, Plus, Star } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-blue-600 border-b-2 border-blue-600'
      : 'text-gray-700 hover:text-blue-600'

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Ustaad App
          </Link>

          {/* Nav Links */}
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition ${isActive('/')}`}
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <Link
              to="/add-business"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition ${isActive('/add-business')}`}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Business
            </Link>
            <Link
              to="/top-rated"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition ${isActive('/top-rated')}`}
            >
              <Star className="w-4 h-4 mr-1" />
              Top Rated
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
