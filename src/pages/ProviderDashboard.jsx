import {Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { opportunities as initialOpportunities } from "../data/opportunities";
import OpportunityForm from "../components/OpportunityForm";
import ProviderStats from "../components/ProviderStats";

function ProviderDashboard() {
const [opportunities, setOpportunities] = useState( initialOpportunities );
const [editingOpportunity, setEditingOpportunity]=useState(null);

  const {user}=useAuth();
  const currentProviderId=user?.role === "provider" ? user.id : null;

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
const myOpportunities = opportunities.filter(  (opportunity) => currentProviderId !=null && String(opportunity.providerId)===String(currentProviderId));
const today = new Date().toISOString().split("T")[0];
const activeOpportunities = myOpportunities.filter( (opportunity) => opportunity.closingDate >= today);
const expiredOpportunities = myOpportunities.filter( (opportunity) => opportunity.closingDate < today);

 return (
    <div className="min-h-screen bg-[#F0FDFA] p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-[#042F2E]"> Provider Dashboard</h1>
        <p className="mt-2 text-[#134E4A]"> Manage your opportunities and track your listings. </p>
        <div className="mt-8">
  <ProviderStats total={myOpportunities.length} active={activeOpportunities.length} expired={expiredOpportunities.length}/>
</div>
        <div className="mt-8">
          <OpportunityForm onAddOpportunity={handleAddOpportunity} providerId={currentProviderId} onCancelEdit={()=> setEditingOpportunity(null)}  editingOpportunity={editingOpportunity} onUpdateOpportunity={handleUpdateOpportunity}/>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-[#042F2E]"> My Opportunities </h2>

      
{myOpportunities.map((opportunity) => {
  const isExpired = opportunity.closingDate < today;

  return (
    <div key={opportunity.id} className="mb-4 rounded-xl bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-[#042F2E]"> {opportunity.title}</h3>

        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${ isExpired ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700" }`}>
          {isExpired ? "Expired" : "Active"}
        </span>
      </div>

      <p className="text-[#134E4A]">{opportunity.organization}</p>

      <p className="mt-2 text-sm"> Deadline: {opportunity.closingDate}</p>

      <button onClick={() => setEditingOpportunity(opportunity)} className="mt-4 rounded-lg bg-[#0F766E] px-4 py-2 font-semibold text-white hover:bg-[#134E4A]">
        Edit
      </button>

      <button onClick={() => handleDeleteOpportunity(opportunity.id)} className="mt-4 ml-3 rounded-lg bg-[#FB7185] px-4 py-2 font-semibold text-white hover:bg-red-600"
      > Delete
      </button>
      <Link
      to={`/applicants?opportunityId=${encodeURIComponent(opportunity.id)}`}
      className="mt-4 ml-3 inline-block rounded-lg bg-amber-100 px-4 py-2 font-semibold text-amber-900 hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">
        View applicants
      </Link>
    </div>
  );
})}

        </div>
      </div>
    </div>
  );
}

export default ProviderDashboard;
