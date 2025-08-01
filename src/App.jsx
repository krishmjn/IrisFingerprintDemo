// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./Container/Navbar/Navbar";
import Dashboard from "./Container/Dashboard/Dashboard";
import GlobalStyle from "./globalStyles";
import Search from "./Container/Search/Search";
import FingerprintMainView from "./Container/Fingerprint/FingerprintMainView";
const App = () => {
  return (
    <div id="app" style={{ minHeight: "100%", minWidth: "100%" }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />

          <Route path="/fingerprint" element={<FingerprintMainView />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <GlobalStyle />
      </Router>
    </div>
  );
};

export default App;
