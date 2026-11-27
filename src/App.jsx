import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import ApplicantReviewPage from "./pages/Applicants.jsx";
import { opportunities as initialOpportunities } from "./data/opportunities.js";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplicationForm from "./components/ApplicationForm";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Opportunities from "./pages/Opportunities";
import Bookmarks from "./pages/Bookmarks";
import RoleInfo from "./pages/RoleInfo.jsx";
import ProviderDashboard from "./pages/ProviderDashboard";
import CareerGuidance from "./pages/CareerGuidance";

const applicationsKey = "pathly.applications";
const listingsKey = "pathly.opportunities";

const pageClass =
  "min-h-[75vh] bg-[#F0FDFA] px-4 py-8 font-sans text-[#042F2E] sm:px-6 sm:py-12";

function readApplications() {
  const saved = JSON.parse(localStorage.getItem(applicationsKey) ?? "[]");

  if (!Array.isArray(saved)) {
    throw new Error("Invalid saved applications");
  }

  return saved;
}

export default function App() {
  const { user } = useAuth();
  const { state, search } = useLocation();
  const selectedOpportunity = state?.opportunity;
  const [submissionMessage, setSubmissionMessage] = useState("");

  const [applications, setApplications] = useState(() => {
    try {
      return readApplications();
    } catch {
      return [];
    }
  });

  const [listings, setListings] = useState(() => {
    try {
      const saved =
        localStorage.getItem(listingsKey) ??
        localStorage.getItem("pathly.listings");
      const parsed = JSON.parse(saved ?? "null");
      return Array.isArray(parsed) ? parsed : initialOpportunities;
    } catch {
      return initialOpportunities;
    }
  });

  useEffect(() => {
    localStorage.setItem(listingsKey, JSON.stringify(listings));
  }, [listings]);

  const seekerId =
    user?.role === "seeker" && user.id != null ? String(user.id) : null;

  const myApplications = seekerId
    ? applications.filter((item) => String(item.seekerId) === seekerId)
    : [];

  const reviewOpportunityId = new URLSearchParams(search).get("opportunityId");

  const ownedListing = listings.find(
    (listing) =>
      user?.role === "provider" &&
      user.id != null &&
      String(listing.id) === reviewOpportunityId &&
      String(listing.providerId) === String(user.id)
  );

  function saveApplications(updatedApplications) {
    localStorage.setItem(applicationsKey, JSON.stringify(updatedApplications));
    setApplications(updatedApplications);
  }

  function handleApply(answer) {
    if (!seekerId) {
      setSubmissionMessage("Sign in with a seeker account to apply.");
      return false;
    }

    if (selectedOpportunity?.id == null) {
      setSubmissionMessage("Choose an opportunity before applying.");
      return false;
    }

    const opportunityId = String(selectedOpportunity.id);

    try {
      const saved = readApplications();
      const alreadyApplied = saved.some(
        (item) =>
          String(item.seekerId) === seekerId &&
          String(item.opportunityId) === opportunityId
      );

      if (alreadyApplied) {
        setSubmissionMessage("You have already applied for this opportunity.");
        return false;
      }

      const application = {
        id: crypto.randomUUID(),
        seekerId,
        opportunityId,
        opportunityTitle: selectedOpportunity.title,
        statement: answer,
        status: "Submitted",
        submittedAt: new Date().toISOString(),
      };

      saveApplications([...saved, application]);
      setSubmissionMessage("Application submitted.");
      return true;
    } catch {
      setSubmissionMessage("Could not save your application. Please try again.");
      return false;
    }
  }

  function handleStatusChange(applicationId, nextStatus) {
    if (!["Shortlisted", "Accepted", "Rejected"].includes(nextStatus)) {
      return "Choose a valid application status.";
    }

    try {
      const saved = readApplications();
      const application = saved.find((item) => item.id === applicationId);

      if (!application) {
        return "This application could not be found.";
      }

      if (!ownedListing || String(application.opportunityId) !== String(ownedListing.id)) {
        return "You can only review applications for your own listing.";
      }

      saveApplications(
        saved.map((item) =>
          item.id === applicationId ? { ...item, status: nextStatus } : item
        )
      );

      return "";
    } catch {
      return "Could not update the application status. Please try again.";
    }
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/join/:type" element={<RoleInfo />} />
        <Route
          path="/opportunities"
          element={<Opportunities pathlyOpportunities={listings} />}
        />
        <Route path="/bookmarks" element={<Bookmarks />} />

        <Route
          path="/apply"
          element={
            <ProtectedRoute requiredRole="seeker">
              <main className={pageClass}>
                <section className="mx-auto max-w-2xl rounded-2xl border border-teal-100 bg-white p-5 shadow-sm sm:p-6">
                  <h1 className="mb-5 text-2xl font-bold">
                    {selectedOpportunity
                      ? `Apply for ${selectedOpportunity.title}`
                      : "Apply for an opportunity"}
                  </h1>

                  <ApplicationForm onApply={handleApply} />

                  {submissionMessage && (
                    <p role="status" className="mt-4 rounded-xl bg-[#F0FDFA] px-4 py-3 text-sm text-[#134E4A]">
                      {submissionMessage}
                    </p>
                  )}

                  <Link to="/my-applications" className="mt-4 inline-block text-sm font-semibold text-[#0F766E] underline">
                    View my applications
                  </Link>
                </section>
              </main>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute requiredRole="seeker">
              <main className={pageClass}>
                <section className="mx-auto max-w-3xl rounded-2xl border border-teal-100 bg-white p-5 shadow-sm sm:p-6">
                  <h1 className="mb-5 text-2xl font-bold">My Applications</h1>

                  {myApplications.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-teal-200 p-4 text-sm">
                      You have not submitted any applications yet.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {myApplications.map((application) => (
                        <li key={application.id} className="rounded-xl border border-teal-100 bg-[#F0FDFA] p-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-semibold">
                              {application.opportunityTitle ??
                                listings.find(
                                  (listing) =>
                                    String(listing.id) === String(application.opportunityId)
                                )?.title ??
                                application.opportunityId}
                            </h2>
                            <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-[#134E4A]">
                              {application.status === "Rejected" ? "Denied" : application.status}
                            </span>
                          </div>
                          <p className="mt-3 wrap-break-word text-sm text-[#134E4A]">
                            {application.statement}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </main>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />
        <Route
          path="/provider-dashboard"
          element={
            <ProtectedRoute requiredRole="provider">
              <ProviderDashboard
                opportunities={listings}
                setOpportunities={setListings}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicants"
          element={
            <ProtectedRoute requiredRole="provider">
              {ownedListing ? (
                <ApplicantReviewPage
                  key={ownedListing.id}
                  applications={applications}
                  ownedOpportunities={[ownedListing]}
                  onStatusChange={handleStatusChange}
                />
              ) : (
                <p>This listing is unavailable or does not belong to your account.</p>
              )}
            </ProtectedRoute>
          }
        />
        <Route path="/career-guidance" element={<CareerGuidance />} />
      </Routes>

      <Footer />
    </>
  );
}