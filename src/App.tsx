import { Navigate, Route, Routes } from 'react-router-dom'
import Introduction from './pages/Introduction'
import HourlyRate from './pages/HourlyRate'
import PrivateDetails from './pages/PrivateDetails'
import PublicProfile from './pages/PublicProfile'
import TourStory from './pages/TourStory'
import VerifyIdentity from './pages/VerifyIdentity'
import WhatYouOffer from './pages/WhatYouOffer'
import YourExperience from './pages/YourExperience'
import { ApplicationProvider } from './state/application'

export default function App() {
  return (
    <ApplicationProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/apply" replace />} />
        <Route path="/apply" element={<Introduction />} />
        <Route path="/apply/profile" element={<PublicProfile />} />
        <Route path="/apply/details" element={<PrivateDetails />} />
        <Route path="/apply/offer" element={<WhatYouOffer />} />
        <Route path="/apply/experience" element={<YourExperience />} />
        <Route path="/apply/story" element={<TourStory />} />
        <Route path="/apply/rate" element={<HourlyRate />} />
        <Route path="/verify" element={<VerifyIdentity />} />
      </Routes>
    </ApplicationProvider>
  )
}
