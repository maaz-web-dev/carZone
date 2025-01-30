import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./component/contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/SignIn";
import Signup from "./pages/Register";
import Dashboard from "./component/Dashboard/Dashboard";
import Categories from "./component/CategoryManagement/CategoryManagement";
import Cars from "./component/CarManagement/CarManagement";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        <Route
          element={
            // <ProtectedRoute>
              <MainLayout />
         /* </ProtectedRoute>  */
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cars" element={<Cars />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
