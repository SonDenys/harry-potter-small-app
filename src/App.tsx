import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import Header from "./pages/components/Header";

const App = () => {
  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <Router>
        <Header />
        <Routes>
          <Route path="/" caseSensitive={false} element={<HomePage />} />
          <Route path="/:character_name" element={<CharacterPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
