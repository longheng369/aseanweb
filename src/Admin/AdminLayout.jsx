import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const AdminLayout = () => {
  return (
    <div>
      <div className="sticky top-0 m-0 z-10">
        <Nav />
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
