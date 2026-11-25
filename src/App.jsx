

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Opportunities from "./pages/Opportunities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/opportunities" />} />
        <Route path="/opportunities" element={<Opportunities />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
