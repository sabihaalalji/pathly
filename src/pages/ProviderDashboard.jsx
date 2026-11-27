import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import OpportunityForm from "../components/OpportunityForm";
import ProviderStats from "../components/ProviderStats";

function ProviderDashboard({ opportunities, setOpportunities }) {
  const { user } = useAuth();
  const currentProviderId = user?.role === "provider" ? user.id : null;
  const [editingOpportunity, setEditingOpportunity] = useState(null);

  function handleAddOpportunity(newOpportunity) {
    setOpportunities((previousOpportunities) => [
      ...previousOpportunities,
      newOpportunity,
    ]);
  }
