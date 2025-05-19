import { Link } from "react-router-dom";

const EmailConfirmed = () => {
  return (
    <div className="flex justify-center items-center !py-20">
      <h2 className="text-xl font-medium text-gray-600">
        ✅ Your email has been confirmed successfully! You can now {" "}
        <Link
          to="/login "
          className="!mt-4 text-blue-500 hover:underline"
        >
          Login
        </Link>
      </h2>
    </div>
  );
};

export default EmailConfirmed;
