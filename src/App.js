import './App.css'
import { useState } from 'react'
import Home from './pages/Home'
import Timetable from './pages/Timetable'
import Privacy from "./pages/Privacy";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  
const [hasTimetable, setHasTimetable] = useState(() => {
  const data = localStorage.getItem('timetable');
  if (!data) return false;
  try {
    const parsed = JSON.parse(data);
    return !parsed.every(day =>
      day.every(period => period.subject === '' && period.room === '')
    );
  } catch {
    return false;
  }
});

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home hasTimetable={hasTimetable} />} />
        <Route path="/timetable" element={<Timetable setHasTimetable={setHasTimetable} />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
