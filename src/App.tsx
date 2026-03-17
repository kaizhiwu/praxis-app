import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeScreen } from './screens/HomeScreen'
import { ResultsScreen } from './screens/ResultsScreen'
import { PlaceDetailScreen } from './screens/PlaceDetailScreen'

function App() {
  return (
    <BrowserRouter>
      <div className="grain">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="/place/:id" element={<PlaceDetailScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
