
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
    <div>
      <h1>My Bookmarks</h1>
      <p>Your saved opportunities, all in one place.</p>

      {bookmarks.length === 0 ? (
        <p>You haven't bookmarked any opportunities yet.</p>
      ) : (
        bookmarks.map((job) => (
          <OpportunityCard
            key={job.id}
            opportunity={job}
            onViewDetails={setSelectedOpportunity}
            isBookmarked={true}
            onToggleBookmark={handleRemoveBookmark}
          />
        ))
      )}
    </div>
  );
}

export default Bookmarks;
