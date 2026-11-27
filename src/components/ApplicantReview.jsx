const reviewActions = [
  { label: "Shortlist", status: "Shortlisted" },
  { label: "Accept", status: "Accepted" },
  { label: "Reject", status: "Rejected" },
];

const statusClasses = {
  Submitted: "bg-teal-100 text-teal-900",
  Shortlisted: "bg-amber-100 text-amber-900",
  Accepted: "bg-emerald-100 text-emerald-900",
  Rejected: "bg-rose-100 text-rose-900",
};

export default function ApplicantReview({ application, onStatusChange }) {
  const { id, statement, status } = application;

  return (
    <article className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold">Application statement</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusClasses[status] ?? "bg-slate-100 text-slate-700"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-3 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-[#134E4A]">
        {statement}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {reviewActions.map(({ label, status: nextStatus }) => (
          <button
            key={nextStatus}
            type="button"
            disabled={status === nextStatus}
            onClick={() => onStatusChange(id, nextStatus)}
            className="rounded-lg border border-teal-700 px-4 py-2 text-sm font-semibold text-[#134E4A] enabled:hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-default disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-600"
          >
            {label}
          </button>
        ))}
      </div>
    </article>
  );
}