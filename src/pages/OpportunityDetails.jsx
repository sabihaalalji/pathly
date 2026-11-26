
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";

export default function OpportunityDetails({ opportunity, onBack }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchJobDetails() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://devglobaljobs.com/api/v1/jobs/${opportunity.id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load opportunity details.");
        }

        const data = await response.json();
        setJob(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchJobDetails();

    return () => controller.abort();
  }, [opportunity.id]);

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F0FDFA]">
        <p className="text-lg font-semibold text-[#0F766E]">
          Loading opportunity details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F0FDFA]">
        <p className="text-red-600">{error}</p>
        <button
          onClick={onBack}
          className="rounded-xl bg-[#0F766E] px-6 py-3 text-white"
        >
          Back to Opportunities
        </button>
      </div>
    );
  }

  const details = job || opportunity;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = details.closingDate
    ? new Date(details.closingDate)
    : null;

  if (deadline) {
    deadline.setHours(23, 59, 59, 999);
  }

  const isExpired =
    !deadline ||
    Number.isNaN(deadline.getTime()) ||
    deadline < today;

  return (
    <main className="min-h-screen bg-[#F0FDFA] px-5 py-12 font-sans text-[#042F2E] sm:px-8">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={onBack}
          className="mb-8 text-sm font-semibold text-[#0F766E] transition hover:text-[#FB7185]"
        >
          Back to Opportunities
        </button>

        <div className="rounded-2xl border border-[#D8EFEB] bg-white p-6 shadow-sm sm:p-10">

          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#0F766E]">
            Opportunity Details
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#134E4A] sm:text-4xl">
            {details.title}
          </h1>

          <p className="mt-3 text-lg font-semibold text-[#52736F]">
            {details.organization?.split(" (")[0]}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#D9F3ED] px-4 py-2 text-sm font-medium text-[#0F766E]">
              {details.location}
            </span>

            <span className="rounded-full bg-[#D9F3ED] px-4 py-2 text-sm font-medium text-[#0F766E]">
              {details.jobType}
            </span>

            {details.salary && (
              <span className="rounded-full bg-[#D9F3ED] px-4 py-2 text-sm font-medium text-[#0F766E]">
                {details.salary}
              </span>
            )}
          </div>

          <div className="my-8 grid grid-cols-1 gap-5 border-y border-[#D8EFEB] py-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#688782]">
                Location
              </p>
              <p className="mt-2 font-semibold text-[#134E4A]">
                {details.location}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#688782]">
                Closing Date
              </p>
              <p className="mt-2 font-semibold text-[#134E4A]">
                {formatDate(details.closingDate)}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#688782]">
                Employment Type
              </p>
              <p className="mt-2 font-semibold text-[#134E4A]">
                {details.jobType}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#688782]">
                Date Posted
              </p>
              <p className="mt-2 font-semibold text-[#134E4A]">
                {formatDate(details.postedAt)}
              </p>
            </div>
          </div>

          <section>
            <h2 className="mb-5 text-2xl font-bold text-[#134E4A]">
              Full Job Description
            </h2>

            {job?.description ? (
              <div
                className="text-sm leading-8 text-[#52736F] [&_h2]:mb-4 [&_h2]:mt-7 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#134E4A] [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#134E4A] [&_p]:mb-4 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(job.description),
                }}
              />
            ) : (
              <p className="text-sm text-[#688782]">
                Full description is unavailable.
              </p>
            )}
          </section>

          <div className="mt-10 flex flex-wrap gap-4">
            {isExpired ? (
              <button
                disabled
                className="cursor-not-allowed rounded-xl bg-gray-400 px-7 py-3 font-semibold text-white"
              >
                Applications Closed
              </button>
            ) : (
              <Link
                to="/apply"
                className="rounded-xl bg-[#0F766E] px-7 py-3 font-semibold text-white transition hover:bg-[#134E4A]"
              >
                Apply Now
              </Link>
            )}

            <button
              onClick={onBack}
              className="rounded-xl border border-[#CCEBE5] px-7 py-3 font-semibold text-[#134E4A] transition hover:bg-[#F0FDFA]"
            >
              Back to Opportunities
            </button>
          </div>

        </div>

        <p className="mt-8 text-center text-xs text-[#688782]">
          Opportunities powered by{" "}
          <a
            href="https://devglobaljobs.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#0F766E] underline"
          >
            Dev Global Jobs
          </a>
        </p>

      </div>
    </main>
  );
}


