function cleanDescription(description) {
  return description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
export default function OpportunityDetails({ opportunity, onBack }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const deadline = new Date(opportunity.closingDate); deadline.setHours(23, 59, 59, 999);

  const isExpired = !opportunity.closingDate || Number.isNaN(deadline.getTime()) || deadline < today;

  return (
    <div>
      <h1>{opportunity.title}</h1>
      <p>{opportunity.organization}</p>
       <p>{opportunity.location}</p>
        <p>{opportunity.jobType}</p>
       <p>{opportunity.salary}</p>
       <p> Deadline:{""} {opportunity.closingDate ? new Date(opportunity.closingDate).toLocaleDateString("en-GB") : "Not available"}</p>
       <p>{cleanDescription(opportunity.descriptionExcerpt || "")}</p>

        {isExpired ? (
       <button disabled className="bg-gray-400 text-white px-4 py-2 rounded"> Applications Closed</button>
      ) : (
        <button className="bg-teal-700 text-white px-4 py-2 rounded">Apply now</button>
      )}
         
      <button onClick={onBack}>Back to Opportunities</button>
    </div>
  );
}
