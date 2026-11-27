import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import OpportunityDetails from "./OpportunityDetails";
import OpportunityCard from "../components/OpportunityCard";

function Opportunities({ pathlyOpportunities }) {
const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");

  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarks")) || [];
  });

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const locations = [
    ...new Set(opportunities.map((job) => job.location)),
  ];

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

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await fetch(
          "https://devglobaljobs.com/api/v1/jobs?limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch opportunities");
        }

        const data = await response.json();
        setOpportunities(data.jobs || []);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
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

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesJobType
    );
  });

  if (selectedOpportunity) {
    return (
      <OpportunityDetails
        opportunity={selectedOpportunity}
        onBack={handleBack}
      />
    );
  }

  const selectStyle =
    "w-full rounded-xl border border-[#CCEBE5] bg-white px-4 py-3 text-sm text-[#134E4A] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10";

  return (
    <main className="min-h-screen bg-[#F0FDFA] px-5 py-12 font-sans text-[#042F2E] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#0F766E]">
            Find your next opportunity
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#134E4A] sm:text-4xl">
            Explore Opportunities
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#52736F] sm:text-base">
            Discover internships, jobs and opportunities that
            match your interests and career goals.
          </p>
        </div>

        <section className="mb-8">
  <h2 className="mb-4 text-xl font-bold text-[#134E4A]">
    Pathly Opportunities
  </h2>

  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {pathlyOpportunities.map((listing) => {
       const today = new Date().toISOString().slice(0, 10);
       const isExpired = listing.closingDate < today;

       return (
        <article
          key={listing.id}
          className="rounded-xl border border-[#D8EFEB] bg-white p-4"
        >
          <h3 className="font-semibold">{listing.title}</h3>
          <p className="text-sm text-[#52736F]">{listing.organization}</p>

          {isExpired ? (
            <p className="mt-3 inline-block min-w-44 rounded-lg bg-slate-700 px-4 py-2 text-center text-sm font-semibold text-white">Applications closed</p>
          ) : (
            <Link
              to="/apply"
              state={{
                opportunity: {
                  id: String(listing.id),
                  title: listing.title,
                },
              }}
              className="mt-3 inline-block min-w-44 rounded-lg bg-[#FB7185] px-4 py-2 text-center text-sm font-semibold text-[#042F2E]"
            >
              Apply on Pathly
            </Link>
          )}
        </article>
        );
    })}
  </div>
</section>

        <div className="mb-8 rounded-2xl border border-[#D8EFEB] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-[#134E4A]">
              Search opportunities
            </label>

            <input
              type="text"
              placeholder="Search by opportunity title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#CCEBE5] bg-[#F8FEFC] px-4 py-3 text-sm outline-none transition placeholder:text-[#91AAA6] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#134E4A]">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={selectStyle}
              >
                <option value="all">All Categories</option>
                <option value="technology">Technology</option>
                <option value="engineering">Engineering</option>
                <option value="remote">Remote</option>
                <option value="government">Government</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#134E4A]">
                Location
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={selectStyle}
              >
                <option value="all">All Locations</option>

                {locations.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#134E4A]">
                Opportunity Type
              </label>

              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className={selectStyle}
              >
                <option value="all">All Types</option>
                <option value="Full-time">Full-Time</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-[#134E4A]">
            Available Opportunities
          </h2>

          <span className="rounded-full bg-[#D9F3ED] px-4 py-2 text-sm font-semibold text-[#0F766E]">
            {filteredOpportunities.length} found
          </span>
        </div>

        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#A9D7CE] bg-white px-6 py-16 text-center">
            <h3 className="text-lg font-bold text-[#134E4A]">
              No opportunities found
            </h3>

            <p className="mt-2 text-sm text-[#688782]">
              Try changing your search or filters to find more opportunities.
            </p>
          </div>
        )}

        <p className="mt-12 text-center text-xs text-[#688782]">
          Opportunities powered by{" "}
          <a
            href="https://devglobaljobs.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#0F766E] underline underline-offset-4 hover:text-[#FB7185]"
          >
            Dev Global Jobs
          </a>
        </p>
      </div>
    </main>
  );
}

export default Opportunities;
