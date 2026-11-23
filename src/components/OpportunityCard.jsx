function cleanDescription(description) {
  return description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function OpportunityCard({ opportunity }) {
  return (
    <div className="opportunity-card">
      <h3>{opportunity.title}</h3>
      <p>{opportunity.organization.split(" (")[0]}</p>
      
      <p>{opportunity.salary && <p>{opportunity.salary}</p>}</p>
      <span>{opportunity.jobType}</span>
      <p>{cleanDescription(opportunity.descriptionExcerpt)}</p>
      <p>Deadline: {new Date(opportunity.closingDate).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric"
})}</p>
      <button><a href={opportunity.url} target="_blank" rel="noreferrer">
  View Details
</a></button>
    </div>
  );
}

export default OpportunityCard;
