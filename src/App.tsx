import { Navigate, Route, Routes } from 'react-router-dom'
import Introduction from './pages/Introduction'
import PublicProfile from './pages/PublicProfile'
import VerifyIdentity from './pages/VerifyIdentity'
import { ApplicationProvider } from './state/application'

export default function App() {
  return (
    <ApplicationProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/apply" replace />} />
        <Route path="/apply" element={<Introduction />} />
        <Route path="/apply/profile" element={<PublicProfile />} />
        <Route path="/verify" element={<VerifyIdentity />} />
      </Routes>
    </ApplicationProvider>
  )
}
