import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slicers/user";

import { ProtectedRoute } from "./components/ProtectedRoute";
import NavigationBar from "./components/NavigationBar";
import Trades from "./containers/Trades";
import Backtests from "./containers/Backtests";
import Profile from "./containers/Profile";
import Dashboard from "./containers/Dashboard";
import Settings from "./containers/Settings";
import LoginPage from "./containers/LoginPage";

function App() {
  let user = localStorage.getItem("user");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);

  const protectedRouteController = (component) => {
    return <ProtectedRoute user={user}>{component}</ProtectedRoute>;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<NavigationBar />}>
            <Route index element={protectedRouteController(<Dashboard />)} />
            <Route
              path="/trades"
              element={protectedRouteController(<Trades />)}
            />
            <Route
              path="/backtests"
              element={protectedRouteController(<Backtests />)}
            />
            <Route path="/profile/:id" element={<Profile />} />
            <Route
              path="/settings"
              element={protectedRouteController(<Settings />)}
            />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
