import { useState } from "react";
import { opportunities as initialOpportunities } from "../data/opportunities";
import OpportunityForm from "../components/OpportunityForm";

function ProviderDashboard() {
const [opportunities, setOpportunities] = useState( initialOpportunities );

  // Temporary sample provider account
const currentProviderId = 101;

  // Add a new opportunity
function handleAddOpportunity(newOpportunity) { setOpportunities((previousOpportunities) => [ ...previousOpportunities, newOpportunity, ]);}

  // Shows only opportunities belonging to this provider
const myOpportunities = opportunities.filter(  (opportunity) => opportunity.providerId === currentProviderId);

 return (
    <div className="min-h-screen bg-[#F0FDFA] p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-[#042F2E]"> Provider Dashboard</h1>
        <p className="mt-2 text-[#134E4A]"> Manage your opportunities and track your listings. </p>
        <div className="mt-8">
          <OpportunityForm onAddOpportunity={handleAddOpportunity} providerId={currentProviderId}/>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-[#042F2E]"> My Opportunities </h2>

          {myOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="mb-4 rounded-xl bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#042F2E]"> {opportunity.title}</h3>
              <p className="text-[#134E4A]"> {opportunity.organization} </p>
              <p className="mt-2 text-sm"> Deadline: {opportunity.closingDate} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProviderDashboard;
