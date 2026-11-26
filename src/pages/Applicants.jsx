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
        <section>
            <h1>Applicants</h1>
            {receivedApplications.length === 0 ?(
                <p>No applications have been submitted for your listing yet.</p>):(
                    receivedApplications.map((application)=>(
                        <ApplicantReview
                        key={application.id}
                        application={application}
                        onStatusChange={onStatusChange}/>
                    ))
                )}
        </section>
    );
}