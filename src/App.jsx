// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Demographic from "./Container/Demographic/Demographic";
import NavBar from "./Container/Navbar/Navbar";
import Dashboard from "./Container/Dashboard/Dashboard";
import GlobalStyle from "./globalStyles";
import DemographicMain from "./Container/Demographic/DemographicMain";
import Search from "./Container/Search/Search";
const App = () => {
  return (
    <div id="app">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/demographic" element={<DemographicMain />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <GlobalStyle />
      </Router>
    </div>
  );
};

export default App;
