import { useState } from "react";
import { opportunities as initialOpportunities } from "../data/opportunities";
import OpportunityForm from "../components/OpportunityForm";

function ProviderDashboard() {
const [opportunities, setOpportunities] = useState( initialOpportunities );
const [editingOpportunity, setEditingOpportunity]=useState(null);

  // Temporary sample provider account
const currentProviderId = 101;

  // Add a new opportunity
function handleAddOpportunity(newOpportunity) { setOpportunities((previousOpportunities) => [ ...previousOpportunities, newOpportunity, ]);}

// Update an existing opportunity
  function handleUpdateOpportunity(updatedOpportunity) {
setOpportunities((previousOpportunities) => previousOpportunities.map((opportunity) => opportunity.id === updatedOpportunity.id  ? updatedOpportunity: opportunity) );

setEditingOpportunity(null);
  }

  // Delete an opportunity
function handleDeleteOpportunity(id) {
  setOpportunities((previousOpportunities) => previousOpportunities.filter((opportunity) => opportunity.id !== id));
}
   
  // Shows only opportunities belonging to this provider
const myOpportunities = opportunities.filter(  (opportunity) => opportunity.providerId === currentProviderId);

 return (
    <div className="min-h-screen bg-[#F0FDFA] p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-[#042F2E]"> Provider Dashboard</h1>
        <p className="mt-2 text-[#134E4A]"> Manage your opportunities and track your listings. </p>
        <div className="mt-8">
          <OpportunityForm onAddOpportunity={handleAddOpportunity} providerId={currentProviderId} onCancelEdit={()=> setEditingOpportunity(null)}  editingOpportunity={editingOpportunity} onUpdateOpportunity={handleUpdateOpportunity}/>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-[#042F2E]"> My Opportunities </h2>

          {myOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="mb-4 rounded-xl bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#042F2E]"> {opportunity.title}</h3>
              <p className="text-[#134E4A]"> {opportunity.organization} </p>
              <p className="mt-2 text-sm"> Deadline: {opportunity.closingDate} </p>
               <button onClick={() => setEditingOpportunity(opportunity)}className="mt-4 rounded-lg bg-[#0F766E] px-4 py-2 font-semibold text-white hover:bg-[#134E4A]">Edit</button>
               <button
  onClick={() => handleDeleteOpportunity(opportunity.id)}
  className="mt-4 ml-3 rounded-lg bg-[#FB7185] px-4 py-2 font-semibold text-white hover:bg-red-600"> Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProviderDashboard;
