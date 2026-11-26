import React from "react";
function cleanDescription(description) {
  return description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
export default function OpportunityDetails({ opportunity, onBack }) {
  return (
    <div>
      <h1>{opportunity.title}</h1>
      <p>{opportunity.organization}</p>
       <p>{opportunity.location}</p>
        <p>{opportunity.jobType}</p>
       <p>{opportunity.salary}</p>
       <p>{opportunity.closingDate}</p>
       <p>{cleanDescription(opportunity.descriptionExcerpt || "")}</p>
       <button>Apply now</button>
         
      <button onClick={onBack}>Back to Opportunities</button>
    </div>
  );
}
