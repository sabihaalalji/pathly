import OpportunityDetails from "./OpportunityDetails";
import { useState, useEffect } from "react";
import OpportunityCard from "../components/OpportunityCard";

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");
   const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const locations = [...new Set(opportunities.map((job) => job.location))];
  const handleViewDetails = (job) => {
  setSelectedOpportunity(job);
};
  

  useEffect(() => {
    async function fetchOpportunities() {
      const response = await fetch(
        "https://devglobaljobs.com/api/v1/jobs?limit=100"
      );
      const data = await response.json();
      console.log([...new Set(data.jobs.map((job) => job.jobType))]);
      
      setOpportunities(data.jobs);
    }

    fetchOpportunities();
  }, []);

  const filteredOpportunities = opportunities.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

      const matchesLocation =
      location === "all" || job.location === location;

    const matchesCategory =
      category === "all" || job.category === category;

      const matchesJobType =
      jobType === "all" || job.jobType === jobType;

    return matchesSearch && matchesCategory && matchesLocation && matchesJobType;
  });

  return (
    <div>
      <h1>Explore Opportunities</h1>

      <input
        type="text"
        placeholder="Search opportunities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="technology">Technology</option>
        <option value="engineering">Engineering</option>
        <option value="remote">Remote</option>
        <option value="government">Government</option>
      </select>

      
<select value={location}
        onChange={(e) => setLocation(e.target.value)}>
  
  <option value="all">All Locations</option>

  

{locations.map((place) => (
  <option key={place} value={place}>
    {place}
  </option> 
))}</select>

<select value={jobType}
        onChange={(e) => setJobType(e.target.value)}>
  
  <option value="all">All Types</option>
  <option value="Full-time">Full-Time</option>
  <option value="Freelance">Freelance</option>
</select>


      {filteredOpportunities.map((job) => (
        <OpportunityCard key={job.id} opportunity={job} onViewDetails={handleViewDetails} />
      ))}

      <p>
        Powered by{" "}
        <a href="https://devglobaljobs.com" target="_blank" rel="noreferrer">
          Dev Global Jobs
        </a>
      </p>
    </div>
  );
}

export default Opportunities;