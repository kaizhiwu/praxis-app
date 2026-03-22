import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeScreen } from './screens/HomeScreen'
import { ResultsScreen } from './screens/ResultsScreen'
import { PlaceDetailScreen } from './screens/PlaceDetailScreen'
import { PitchScreen } from './screens/PitchScreen'
import { LiquidGlassFilter } from './components/LiquidGlass'

function App() {
  return (
    <BrowserRouter>
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
