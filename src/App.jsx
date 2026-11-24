import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Opportunities from "./pages/Opportunities";
import ApplicationForm from "./components/ApplicationForm.jsx";

export default function App() {
  const [submittedAnswer, setSubmittedAnswer] = useState("");

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route
          path="/apply"
          element={
            <section>
              <h2>Apply for an opportunity</h2>
              <ApplicationForm onApply={setSubmittedAnswer} />
              {submittedAnswer && <p>Answer received: {submittedAnswer}</p>}
            </section>
          }
        />
      </Routes>
    </div>
  );
}
