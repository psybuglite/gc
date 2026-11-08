import { Navigate, Route, Routes } from 'react-router-dom'
import Introduction from './pages/Introduction'
import VerifyIdentity from './pages/VerifyIdentity'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/apply" replace />} />
      <Route path="/apply" element={<Introduction />} />
      <Route path="/verify" element={<VerifyIdentity />} />
    </Routes>
  )
}
