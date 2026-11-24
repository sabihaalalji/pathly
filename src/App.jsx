import { useState } from 'react'
import ApplicationForm from './components/ApplicationForm.jsx'
import Opportunities from './pages/Opportunities'

function App() {
  const [submittedAnswer, setSubmittedAnswer] = useState('')

  return (
    <>
      <Opportunities />

      <section>
        <h2>Apply for an opportunity</h2>
        <ApplicationForm onApply={setSubmittedAnswer} />
        {submittedAnswer && <p>Answer received: {submittedAnswer}</p>}
      </section>
    </>
  )
}

export default App