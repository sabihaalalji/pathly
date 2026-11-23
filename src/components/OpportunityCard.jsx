
function OpportunityCard({ opportunity }) {
  return (
    <div className="opportunity-card">
      <h3>{opportunity.title}</h3>
      <p>{opportunity.organization}</p>
      <p>{opportunity.location}</p>
      <span>{opportunity.type}</span>
      <p>{opportunity.description}</p>
      <p>Deadline: {opportunity.deadline}</p>
      <button disabled={opportunity.expired}>
        {opportunity.expired ? "Expired" : "View Details"}
      </button>
    </div>
  );
}

export default OpportunityCard;
