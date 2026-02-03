import './App.css'
import Home from './pages/Home'
import Timetable from './pages/Timetable'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Timetable page */}
        <Route path="/timetable" element={<Timetable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
