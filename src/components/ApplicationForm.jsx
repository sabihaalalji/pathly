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
        {error && (
            <p id="application-error"
            className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                {error}
            </p>
        )}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
                <label htmlFor="application-statement"
                className="mb-2 block text-sm font-semibold text-[#134E4A]">
                    Why are you applying?
                </label>
                <textarea id="application-statement"
                value={statement}
                onChange={(event)=>{
                    setStatement(event.target.value);
                    setError("");
                }}
                required
                rows={5}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "application-error": undefined}
                className="block min-h-32 w-full resize-y rounded-xl border border-teal-200 bg-[#F0FDFA] px-4 py-3 text-sm text-[#042F2E] focus:border-[#0F766E] focus:outline-2 focus:outline-offset-2 focus:outline-[#0F766E]"></textarea>
            </div>
            <button
            type="submit"
            className="w-full rounded-xl bg-[#FB7185] px-5 py-3 text-sm font-bold text-[#042F2E] hover:bg-rose-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] sm:w-auto">
                Submit Application
            </button>
        </form>
        </>
    );
}