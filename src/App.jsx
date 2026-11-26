
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplicationForm from "./components/ApplicationForm.jsx";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Opportunities from "./pages/Opportunities";
import RoleInfo from "./pages/RoleInfo.jsx";
import Bookmarks from "./pages/Bookmarks";

const storageKey = "pathly.applications";
const seekerId = "sample-seeker";
const opportunityId = "sample-internship";

function readApplications() {
  const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]");

  if (!Array.isArray(saved)) {
    throw new Error("Invalid saved applications");
  }

  return saved;
}

export default function App() {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [applications, setApplications] = useState(() => {
    try {
      return readApplications();
    } catch {
      return [];
    }
  });

  const myApplications = applications.filter(
    (application) => application.seekerId === seekerId
  );

  function handleApply(answer) {
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
        statement: answer,
        status: "Submitted",
        submittedAt: new Date().toISOString(),
      };

      const updatedApplications = [...savedApplications, newApplication];
      localStorage.setItem(storageKey, JSON.stringify(updatedApplications));
      setApplications(updatedApplications);
      setSubmissionMessage("Application submitted.");
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
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/join/:type" element={<RoleInfo />} />
        <Route path="/bookmarks" element={<Bookmarks />} />

        <Route
          path="/apply"
          element={
              <main className="min-h-[75vh] bg-[#F0FDFA] px-4 py-8 font-sans text-[#042F2E] sm:px-6 sm:py-12">
                <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-2">
                  <section className="min-w-0 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm sm:p-6">
                    <h1 className="mb-5 text-2xl font-bold">
                      Apply for an opportunity
                    </h1>
                    <ApplicationForm onApply={handleApply}/>
                    {submissionMessage && (
                      <p
                      role="status"
                      className="mt-4 rounded-xl bg-[#F0FDFA] px-4 py-3 text-sm text-[#134E4A]">
                        {submissionMessage}
                      </p>
                    )}
                  </section>

                  <section className="min-w-0 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="mb-5 text-xl font-bold">My Applications</h2>
                    {myApplications.length === 0 ? (
                      <p className="rounded-xl border border-dashed border-teal-200 px-4 py-5 text-sm text-[#134E4A]">
                        You have not submitted any applications yet.
                      </p>
                      ) :(
                        <ul className="space-y-3">
                          {myApplications.map((application)=>(
                            <li key={application.id}
                            className="rounded-xl border border-teal-100 bg-[#F0FDFA] p-4">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold">
                                  {application.opportunityId === "sample-internship" ? "Sample internship"
                                  :application.opportunityId}
                                </h3>

                                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-[#134E4A]">
                                  {application.status}
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
                </div>
              </main>
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
      </Routes>

      <Footer />
    </>
  );
}