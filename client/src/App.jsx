import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/admin/HomePage";
import CategoryPage from "./pages/admin/CategoryPage";
import Home from "./pages/user/Home";
import "./style.scss";
import "./App.css";
import Write from "./pages/user/Write";
import Single from "./pages/user/Single";
import CategoryAdd from "./components/admin/categories/CategoryAdd";
import WritePage from "./pages/admin/WritePage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import UserPage from "./pages/admin/UserPage";

const App = () => {
  return (
    <>
      <div className="app">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Write />} />
            <Route path="/write/:id" element={<Single />} />
          </Routes>
        </div>
      </div>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RouteControl>
              <HomePage />
            </RouteControl>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <RouteControl>
              <CategoryPage />
            </RouteControl>
          }
        />
        <Route
          path="/admin/categories/add"
          element={
            <RouteControl>
              <CategoryAdd />
            </RouteControl>
          }
        />
        <Route
          path="/admin/write"
          element={
            <RouteControl>
              <WritePage />
            </RouteControl>
          }
        />
        <Route
          path="/admin/write/add"
          element={
            <RouteControl>
              <CategoryAdd />
            </RouteControl>
          }
        />
        <Route
          path="/admin/user"
          element={
            <RouteControl>
              <UserPage />
            </RouteControl>
          }
        />
      </Routes>
    </>
  );
};

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
