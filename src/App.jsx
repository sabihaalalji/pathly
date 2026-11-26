import { useState } from 'react'
import ApplicationForm from './components/ApplicationForm.jsx';
import Opportunities from './pages/Opportunities';
import ProviderDashboard from './pages/ProviderDashboard';
import CareerGuidance from './pages/CareerGuidance';
import { Routes, Route } from 'react-router-dom';

function App() {
const [submissionMessage, setSubmissionMessage] = useState('')

function handleApply(answer) {
const seekerId = 'sample-seeker'
const opportunityId = 'sample-internship'
const storageKey = 'pathly.applications'

try {
const savedData = localStorage.getItem(storageKey)
const applications = savedData ? JSON.parse(savedData) : []

const alreadyApplied = applications.some( (application) => application.seekerId === seekerId && application.opportunityId === opportunityId )

if (alreadyApplied) { setSubmissionMessage('You have already applied for this opportunity.')
return
}

const newApplication = {
 id: crypto.randomUUID(),
 seekerId,
 opportunityId,
 statement: answer,
 status: 'Submitted',
 submittedAt: new Date().toISOString(),
}

localStorage.setItem( storageKey, JSON.stringify([...applications, newApplication]))

 setSubmissionMessage('Application submitted.')}
  catch {setSubmissionMessage('Could not save your application. Please try again.')}
  }


return (
<Routes>
    <Route path="/"element={
<>
  <Opportunities />
<section>
    <h2>Apply for an opportunity</h2>
    <ApplicationForm onApply={handleApply} />
    {submissionMessage && <p>{submissionMessage}</p>}
</section>
</>
}
    />

    <Route path="/provider-dashboard" element={<ProviderDashboard />} />
    <Route path="/career-guidance" element={<CareerGuidance />} />
  </Routes>
);
}

export default App
