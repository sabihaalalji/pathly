import { useState } from "react";
export default function ApplicationForm({onApply}){
    const[statement,setStatement]=useState('')
    const[error,setError]=useState('')
    function handleSubmit(event){
        event.preventDefault()
        const answer=statement.trim()
        if(!answer){
            setError('Tell us why you are applying.')
            return
        }
        setError('')
        onApply(answer)
    }
    return(
        <>
        {error && <p id="application-error">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="application-statement">Why are you applying?</label>
            <textarea id="application-statement"
            value={statement}
            onChange={(event)=>{
                setStatement(event.target.value)
                setError('')
            }}
            required
            rows={5}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'application-error':undefined}></textarea>
            <button type="submit">Submit Application</button>
        </form>
        </>
    )
}