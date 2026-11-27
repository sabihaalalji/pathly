import Applicants from "./pages/Applicants.jsx"
import { opportunities as pathlyOpportunities } from "./data/opportunities.js";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
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
import RoleInfo from "./pages/RoleInfo.jsx";
import Bookmarks from "./pages/Bookmarks";
import ProviderDashboard from "./pages/ProviderDashboard";
import CareerGuidance from "./pages/CareerGuidance";
import { useAuth } from "./context/AuthContext";

const storageKey = "pathly.applications";

function readApplications() {
  const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]");

  if (!Array.isArray(saved)) {
    throw new Error("Invalid saved applications");
  }

  return saved;
}

export default function App() {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const {state,search} = useLocation();
  const selectedOpportunity=state?.opportunity;
  const [applications, setApplications] = useState(() => {
    try {
      return readApplications();
    } catch {
      return [];
    }
  });

  const { user } = useAuth();
  const [listings, setListings] = useState(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("pathly.listings") ?? "null");
    return Array.isArray(saved) ? saved : pathlyOpportunities;
  } catch {
    return pathlyOpportunities;
  }
});

useEffect(() => {
  localStorage.setItem("pathly.listings", JSON.stringify(listings));
}, [listings]);
  const reviewOpportunityId = new URLSearchParams(search).get("opportunityId");
  const ownedListing=listings.find(
    (listing)=>user?.role === "provider" &&
    user.id != null &&
    String(listing.id) === reviewOpportunityId &&
    String(listing.providerId) === String(user.id)
  );

const seekerId =
  user?.role === "seeker" && user.id != null ? String(user.id) : null;

const myApplications = seekerId
  ? applications.filter(
      (application) => String(application.seekerId) === seekerId
    )
  : [];

  function handleApply(answer) {
    if (!seekerId){
      setSubmissionMessage("Sign in with a seeker account to apply.");
      return false;
    }
    if(!selectedOpportunity?.id){
      setSubmissionMessage("Choose an opportunity before applying.");
      return;
    }
    const opportunityId=String(selectedOpportunity.id);
    try {
      const savedApplications = readApplications();

      const alreadyApplied = savedApplications.some(
        (application) =>
          application.seekerId === seekerId &&
          application.opportunityId === opportunityId
      );

      if (alreadyApplied) {
        setSubmissionMessage("You have already applied for this opportunity.");
        return;
      }

      const newApplication = {
        id: crypto.randomUUID(),
        seekerId,
        opportunityId,
        opportunityTitle:selectedOpportunity.title,
        statement: answer,
        status: "Submitted",
        submittedAt: new Date().toISOString(),
      };

      const updatedApplications = [...savedApplications, newApplication];
      localStorage.setItem(storageKey, JSON.stringify(updatedApplications));
      setApplications(updatedApplications);
      setSubmissionMessage("Application submitted.");
      return true;
    } catch {
      setSubmissionMessage("Could not save your application. Please try again.");
    }
  }
  function handleStatusChange(applicationId, nextStatus, ownedOpportunities){
    const allowedStatuses=["Shortlisted", "Accepted", "Rejected"];
    if(!allowedStatuses.includes(nextStatus)){
      return "Choose a valid application status.";
    }
    try{
      const savedApplications=readApplications();
      const application=savedApplications.find(
        (item)=>item.id === applicationId
      );
      if(!application){
        return "This application could not be found.";
      }
      const ownsListing=ownedOpportunities.some(
        (opportunity)=>String(opportunity.id) === String(application.opportunityId)
      );
      if(!ownsListing){
        return "You can only review application for your own listing.";
      }
      const updatedApplications=savedApplications.map((item)=>
      item.id === applicationId ? {...item, status:nextStatus}: item);
      localStorage.setItem(storageKey,JSON.stringify(updatedApplications));
      setApplications(updatedApplications);
      return "";
    } catch{
      return "Could not update the application status.Please try again.";
    }
  }

  return (
    <>
      <Navbar />

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/home" element={<Home />} />
  <Opportunities pathlyOpportunities={listings} />
  <Route path="/join/:type" element={<RoleInfo />} />
  <Route path="/bookmarks" element={<Bookmarks />} />

        <Route
          path="/apply"
          element={
            <ProtectedRoute requiredRole="seeker">
              <main className="min-h-[75vh] bg-[#F0FDFA] px-4 py-8 font-sans text-[#042F2E] sm:px-6 sm:py-12">
              <section className="mx-auto max-w-2xl rounded-2xl border border-teal-100 bg-white p-5 shadow-sm sm:p-6">
              <h1 className="mb-5 text-2xl font-bold">
              {selectedOpportunity ? `Apply for ${selectedOpportunity.title}`:"Apply for an opportunity"}</h1>
              <ApplicationForm onApply={handleApply}/>
              {submissionMessage && (
                <p role="status"
                className="mt-4 rounded-xl bg-[#F0FDFA] px-4 py-3 text-sm text-[#134E4A]">
                {submissionMessage}</p>
              )}
              <Link to="/my-applications"
              className="mt-4 inline-block text-sm font-semibold text-[#0F766E] underline underline-offset-4">
                View my applications
              </Link>
              </section>
              </main>
              </ProtectedRoute>
          }
        />
        <Route path="/my-applications"
        element={
          <ProtectedRoute requiredRole="seeker">
          <main className="min-h-[75vh] bg-[#F0FDFA] px-4 py-8 font-sans text-[#042F2E] sm:px-6 sm:py-12">
            <section className="mx-auto max-w-3xl rounded-2xl border border-teal-100 bg-white p-5 shadow-sm sm:p-6">
              <h1 className="mb-5 text-2xl font-bold">
                My Applications
              </h1>
              {myApplications.length === 0 ? (
                <p className="rounded-xl border border-dashed border-teal-200 px-4 py-5 text-sm text-[#134E4A]">
                  You have not submitted any applications yet.
                </p>):(
                  <ul className="space-y-3">
                    {myApplications.map((application)=>(
                      <li key={application.id}
                      className="rounded-xl border border-teal-100 bg-[#F0FDFA] p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-semibold">
                            {application.opportunityTitle ?? (application.opportunityId === "sample-internship"? "sample internship"
                              : application.opportunityId
                            )}
                          </h2>
                          <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-[#134E4A]">
                            {application.status === "Rejected" ? "Denied": application.status}
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
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
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
            {ownedListing ? (<Applicants
            key={ownedListing.id}
          applications={applications}
        ownedOpportunities={[ownedListing]}
      onStatusChange={(applicationId, nextStatus)=>
        handleStatusChange(applicationId, nextStatus, [ownedListing])
      }/>):(
        <p>This listing is unavailable or does not belong to your account.</p>
      )}
          </ProtectedRoute>
        }></Route>

        <Route
          path="/career-guidance"
          element={<CareerGuidance />}
        />
      </Routes>

      <Footer />
    </>
  );
}
