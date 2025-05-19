import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const AccountNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate("/");
  };

  return (
    <div className="w-1/4 bg-white rounded-lg shadow !p-4">
      <ul className="!space-y-2">
        {[
          { path: "/account", label: "My Profile" },
          // { path: "/subscriptions", label: "Manage Subscriptions" },
          // { path: "/newsletters", label: "Manage Newsletters" },
          // { path: "/authors", label: "Follow Authors" },
          { path: "/password-change", label: "Change Password" },
        ].map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `block !p-2 rounded-lg transition ${
                  isActive ? "bg-blue-800 text-white" : "text-gray-900"
                } hover:bg-blue-200`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li>
          <a
            onClick={handleLogout}
            className="block !p-2 rounded-lg cursor-pointer transition hover:bg-blue-200"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AccountNavbar;
