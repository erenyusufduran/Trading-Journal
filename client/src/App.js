import React from "react";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<NavigationBar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
