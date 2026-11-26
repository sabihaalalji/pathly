import { useState } from 'react'
import ApplicationForm from './components/ApplicationForm.jsx'
import Opportunities from './pages/Opportunities'

function App() {
  const [submissionMessage, setSubmissionMessage] = useState('')
  const [applications,setApplications]=useState(()=>{
    try{
      const saved=JSON.parse(localStorage.getItem('pathly.applications') ?? '[]')
      return Array.isArray(saved) ? saved:[]
    }
    catch{
      return[]
    }
  })
  const myApplications=applications.filter((application)=>application.seekerId ==='sample-seeker')

  function handleApply(answer) {
    const seekerId = 'sample-seeker'
    const opportunityId = 'sample-internship'
    const storageKey = 'pathly.applications'

    try {
      const savedData = localStorage.getItem(storageKey)
      const applications = savedData ? JSON.parse(savedData) : []

      const alreadyApplied = applications.some(
        (application) =>
          application.seekerId === seekerId &&
          application.opportunityId === opportunityId
      )

      if (alreadyApplied) {
        setSubmissionMessage('You have already applied for this opportunity.')
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

     const updatedApplications=[...applications,newApplication]
     localStorage.setItem(storageKey,JSON.stringify(updatedApplications))
     setApplications(updatedApplications)

      setSubmissionMessage('Application submitted.')
    } catch {
      setSubmissionMessage('Could not save your application. Please try again.')
    }
  }

  return (
    <>
      <Opportunities />

      <section>
        <h2>Apply for an opportunity</h2>
        <ApplicationForm onApply={handleApply} />
        {submissionMessage && <p>{submissionMessage}</p>}
      </section>

      <section>
        <h2>My Applications</h2>
        {myApplications.length ===0 ?(
          <p>You have not submitted any applications yet.</p>):(
            <ul>
              {myApplications.map((application)=>(
                <li key={application.id}>
                    <p>Opportunity: {application.opportunityId}</p>
                    <p>Status: {application.status}</p>
                    <p>{application.statement}</p>
                </li>
              ))}
            </ul>
          )}
      </section>
    </>
  )
}

export default App