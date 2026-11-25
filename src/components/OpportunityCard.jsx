function cleanDescription(description) {
  return description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function OpportunityCard({ opportunity, onViewDetails }) {
  return (
    <div className="opportunity-card">
      <h3>{opportunity.title}</h3>
      <p>{opportunity.organization.split(" (")[0]}</p>
      
      <p>{opportunity.salary && opportunity.salary}</p>
      <span>{opportunity.jobType}</span>
      <p>{cleanDescription(opportunity.descriptionExcerpt)}</p>
      <p>Deadline: {new Date(opportunity.closingDate).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric"
})}</p>
      <button onClick={() => onViewDetails(opportunity)}>
  View Details
</button>
    </div>
  );
}
    
 

export default OpportunityCard;
