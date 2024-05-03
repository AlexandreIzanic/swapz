import { BarChart3, Home, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col   w-60 bg-[#121412] mt-6 px-6 ">
      <NavLink
        to="/"
        className={({ isActive }) => {
          return `${isActive ? "text-green-300 font-bold" : ""} p-4`;
        }}
        activeClassName="text-green-500"
      >
        <div className="flex gap-2">
          <Home />
          Home
        </div>
      </NavLink>
      <NavLink
        to="/clients"
        className={({ isActive }) => {
          return `${isActive ? "text-green-300 font-bold" : ""} p-4`;
        }}
      >
        <div className="flex gap-2">
          <Users />
          Clients
        </div>
      </NavLink>

      <NavLink
        to="/analytics"
        className={({ isActive }) => {
          return `${isActive ? "text-green-300 font-bold" : ""} p-4`;
        }}
      >
        <div className="flex gap-2">
          <BarChart3 />
          Analytics
        </div>
      </NavLink>
    </div>
  );
};

export default Sidebar;
