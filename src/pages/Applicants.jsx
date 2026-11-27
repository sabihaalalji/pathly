import ApplicantReview from "../components/ApplicantReview.jsx";
export default function Applicants({
    applications,
    ownedOpportunities,
    onStatusChange,
}){
    const opportunityIds=new Set(
        ownedOpportunities.map((opportunity)=> String(opportunity.id))
    );
    const receivedApplications=applications.filter((application)=>
    opportunityIds.has(String(application.opportunityId)));

    return(
        <main className="min-h-[75vh] bg-[#F0FDFA] px-4 py-8 font-sans text-[#042F2E] sm:py-12">
        <section className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-bold">Applicants</h1>
            <p className="mt-1 text-[#134E4A]">
                {ownedOpportunities[0]?.title}
            </p>
            {receivedApplications.length === 0 ?(
                <p className="mt-6 rounded-xl border border-dashed border-teal-200 bg-white p-5 text-sm text-[#134E4A]">No applications have been submitted for your listing yet.</p>):(
                    <ul className="mt-6 space-y-4">
                    {receivedApplications.map((application)=>(
                        <li key={application.id}>
                        <ApplicantReview
                        key={application.id}
                        application={application}
                        onStatusChange={onStatusChange}/>
                        </li>
                    ))}
                    </ul>
                )}
        </section>
        </main>
    );
}