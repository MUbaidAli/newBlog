import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import ContactUs from "./pages/ContactUs";
import SingleBlog from "./pages/SingleBlog";
import Login from "./pages/Login";
import AccountLayout from "./pages/AccountLayout";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";
import CreateBlog from "./pages/CreateBlog";
import BlogManagement from "./pages/BlogManagement";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blog" element={<SingleBlog />} />

        <Route path="/account" element={<AccountLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* dashboard Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Editor"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/create-blog" element={<CreateBlog />} />
          <Route path="/dashboard/manage-blog" element={<BlogManagement />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
