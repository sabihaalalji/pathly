

import { useState, useEffect } from "react";
import OpportunityCard from "../components/OpportunityCard";
import OpportunityDetails from "./OpportunityDetails";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarks")) || [];
  });

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleRemoveBookmark = (opportunity) => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.id !== opportunity.id
    );

    setBookmarks(updatedBookmarks);
  };

  if (selectedOpportunity) {
    return (
      <OpportunityDetails
        opportunity={selectedOpportunity}
        onBack={() => setSelectedOpportunity(null)}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#F0FDFA] px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#FB7185]">
            YOUR COLLECTION
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#134E4A] sm:text-4xl">
            My Bookmarks
          </h1>

          <p className="mt-3 text-base text-[#52736F]">
            Your saved opportunities, all in one place.
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="rounded-2xl border border-[#D8EFEB] bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-xl font-bold text-[#134E4A]">
              No saved opportunities yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#688782]">
              When you find an opportunity that interests you, bookmark it
              and it will appear here.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm font-medium text-[#52736F]">
              {bookmarks.length} saved{" "}
              {bookmarks.length === 1 ? "opportunity" : "opportunities"}
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {bookmarks.map((job) => (
                <OpportunityCard
                  key={job.id}
                  opportunity={job}
                  onViewDetails={setSelectedOpportunity}
                  isBookmarked={true}
                  onToggleBookmark={handleRemoveBookmark}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  );
}

export default Bookmarks;
