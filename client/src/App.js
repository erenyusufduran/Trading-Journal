import React from "react";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trades from "./containers/Trades";
import Backtests from "./containers/Backtests";
import Profile from "./containers/Profile";
import Dashboard from "./containers/Dashboard";
import Settings from "./containers/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<NavigationBar />}>
            <Route index element={<Dashboard />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/backtests" element={<Backtests />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
