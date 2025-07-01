import  { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BusinessDetails from './pages/BusinessDetails'
import AddBusiness from './pages/AddBusiness'
import TopRated from './pages/TopRated'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
        <Route path="/add-business" element={<AddBusiness />} />
        <Route path="/top-rated" element={<TopRated />} />
      </Routes>
    </div>
  )
}

export default App
 