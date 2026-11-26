import OpportunityDetails from "./OpportunityDetails";
import { useState, useEffect } from "react";
import OpportunityCard from "../components/OpportunityCard";

function Opportunities({onViewDetails}) {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  useEffect(() => {
  const savedBookmarks = JSON.parse(
    localStorage.getItem("bookmarks")
  ) || [];

  setBookmarks(savedBookmarks);
}, []);

  const locations = [...new Set(opportunities.map((job) => job.location))];

  const handleViewDetails = (job) => {
    setSelectedOpportunity(job);
  };

  const handleBack = () => {
    setSelectedOpportunity(null);
  };

  const handleToggleBookmark = (opportunity) => {
    const alreadyBookmarked = bookmarks.some(
      (bookmark) => bookmark.id === opportunity.id
    );

    if (alreadyBookmarked) {
      setBookmarks(
        bookmarks.filter((bookmark) => bookmark.id !== opportunity.id)
      );
    } else {
      setBookmarks([...bookmarks, opportunity]);
    }
  };

  // Save bookmarks
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Fetch opportunities
  useEffect(() => {
    async function fetchOpportunities() {
      const response = await fetch(
        "https://devglobaljobs.com/api/v1/jobs?limit=100"
      );
      const data = await response.json();
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

  if (selectedOpportunity) {
    return (
      <OpportunityDetails
        opportunity={selectedOpportunity}
        onBack={handleBack}
      />
    );
  }

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

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="all">All Locations</option>
        {locations.map((place) => (
          <option key={place} value={place}>
            {place}
          </option>
        ))}
      </select>

      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="Full-time">Full-Time</option>
        <option value="Freelance">Freelance</option>
      </select>

      {filteredOpportunities.map((job) => (
        <OpportunityCard
          key={job.id}
          opportunity={job}
          onViewDetails={handleViewDetails}
          isBookmarked={bookmarks.some(
            (bookmark) => bookmark.id === job.id
          )}
          onToggleBookmark={handleToggleBookmark}
        />
      ))}
      
      {selectedOpportunity && (
  <OpportunityDetails opportunity={selectedOpportunity} />
)}

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
