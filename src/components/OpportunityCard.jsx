
function cleanDescription(description = "") {
  return description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function OpportunityCard({
  opportunity,
  onViewDetails,
  isBookmarked,
  onToggleBookmark,
}) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-[#D8EFEB] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0F766E]/40 hover:shadow-lg">

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold leading-snug text-[#134E4A] transition group-hover:text-[#0F766E]">
            {opportunity.title}
          </h3>

          <p className="mt-2 text-sm font-medium text-[#52736F]">
            {opportunity.organization?.split(" (")[0]}
          </p>
        </div>

        <button
          onClick={() => onToggleBookmark(opportunity)}
          className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition ${
            isBookmarked
              ? "bg-[#D9F3ED] text-[#0F766E]"
              : "bg-[#F0FDFA] text-[#52736F] hover:bg-[#D9F3ED]"
          }`}
        >
          {isBookmarked ? "★ Saved" : "☆ Save"}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {opportunity.jobType && (
          <span className="rounded-full bg-[#D9F3ED] px-3 py-1.5 text-xs font-semibold text-[#0F766E]">
            {opportunity.jobType}
          </span>
        )}

        {opportunity.location && (
          <span className="rounded-full bg-[#F0FDFA] px-3 py-1.5 text-xs font-medium text-[#52736F]">
            {opportunity.location}
          </span>
        )}
      </div>

      {opportunity.salary && (
        <p className="mb-3 text-sm font-semibold text-[#0F766E]">
          {opportunity.salary}
        </p>
      )}

      <p className="mb-5 flex-grow text-sm leading-7 text-[#688782]">
        {cleanDescription(opportunity.descriptionExcerpt).slice(0, 180)}
        {opportunity.descriptionExcerpt?.length > 180 ? "..." : ""}
      </p>

      <div className="mt-auto border-t border-[#D8EFEB] pt-4">
        <p className="mb-4 text-xs text-[#688782]">
          Closing date:{" "}
          <span className="font-semibold text-[#134E4A]">
            {opportunity.closingDate
              ? new Date(opportunity.closingDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Not specified"}
          </span>
        </p>

        <button
          onClick={() => onViewDetails(opportunity)}
          className="w-full rounded-xl bg-[#FB7185] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#F43F5E]"
        >
          View Details
        </button>
      </div>

    </div>
  );
}

export default OpportunityCard;


 

