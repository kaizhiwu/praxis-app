import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { HomeScreen } from './screens/HomeScreen'
import { ResultsScreen } from './screens/ResultsScreen'
import { PlaceDetailScreen } from './screens/PlaceDetailScreen'
import { PitchScreen } from './screens/PitchScreen'
import { LiquidGlassFilter } from './components/LiquidGlass'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Immediate + rAF to beat browser scroll restoration
    window.scrollTo(0, 0)
    requestAnimationFrame(() => window.scrollTo(0, 0))
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LiquidGlassFilter />
      <div className="grain">
        <Routes>
          <Route path="/" element={<PitchScreen />} />
          <Route path="/app" element={<HomeScreen />} />
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="/place/:id" element={<PlaceDetailScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
