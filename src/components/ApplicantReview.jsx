const reviewActions=[
    {label:"Shortlist", status:"Shortlisted"},
    {label:"Accept", status:"Accepted"},
    {label:"Reject", status:"Rejected"},
];
export default function ApplicantReview({application, onStatusChange}){
    return(
        <article>
            <p>Opportunity:{application.opportunityId}</p>
            <p>{application.statement}</p>
            <p>Status: {application.status}</p>
            {reviewActions.map(({label,status})=>(
                <button key={status}
                type="button"
                disabled={application.status === status}
                onClick={()=>onStatusChange(application.id, status)}>
                    {label}
                </button>
            ))}
        </article>
    );
}