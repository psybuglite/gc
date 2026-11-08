import { Navigate, Route, Routes } from 'react-router-dom'
import Introduction from './pages/Introduction'
import HourlyRate from './pages/HourlyRate'
import IdVerification from './pages/IdVerification'
import Photos from './pages/Photos'
import References from './pages/References'
import ReviewSubmit from './pages/ReviewSubmit'
import Submitted from './pages/Submitted'
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
        <Route path="/apply/photos" element={<Photos />} />
        <Route path="/apply/id" element={<IdVerification />} />
        <Route path="/apply/references" element={<References />} />
        <Route path="/apply/review" element={<ReviewSubmit />} />
        <Route path="/apply/submitted" element={<Submitted />} />
        <Route path="/verify" element={<VerifyIdentity />} />
      </Routes>
    </ApplicationProvider>
  )
}
