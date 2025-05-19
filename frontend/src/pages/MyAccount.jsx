import AccountNavbar from "../components/AccountNavbar";
import UpdateProfile from "../components/UpdateProfile";

const MyAccount = () => {
  return (
    <div className="flex gap-4 min-h-screen bg-gray-100 !p-4">
      {/* Sidebar */}
      <AccountNavbar />

      {/* Profile Form */}
      <UpdateProfile />
    </div>
  );
};

export default MyAccount;
