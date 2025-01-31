
import Sidebar from "../component/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  console.log("MainLayout rendered");

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
        }}
      >
    
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
