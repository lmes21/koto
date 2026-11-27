import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { StockDetailPage } from './pages/StockDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stock/:symbol" element={<StockDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App