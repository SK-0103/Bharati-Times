import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate(); // Use navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.jwt); // Store user and token in context
        setShowPopup(true); // Show success popup
      } else {
        setError(data?.error?.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSuccessClose = () => {
    setShowPopup(false);
    navigate("/"); // Redirect to home page
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center items-center bg-white !px-3 lg:!px-6 !py-10">
      <div className="bg-white shadow-lg rounded-xl !p-5 sm:!p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-lg md:text-xl font-medium text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-base md:text-lg text-center text-gray-600 !mb-6">
          Sign in to continue
        </p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="!space-y-4 text-sm" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-gray-700 font-medium !mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium !mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Link
              className="text-[0.85rem] text-blue-500 hover:underline"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-800 text-white font-bold !py-2 rounded-lg transition"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center !my-4">
          <div className="flex-grow !h-px bg-gray-300"></div>
          <span className="!px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-grow !h-px bg-gray-300"></div>
        </div>

        <div className="flex gap-4">
          <button className="flex items-center justify-center w-full text-sm bg-red-500 cursor-pointer hover:bg-red-700 text-white !py-2 rounded-lg transition">
            <FaGoogle className="!mr-2" /> Google
          </button>
        </div>

        <p className="text-[0.85rem] text-center text-gray-600 !mt-4">
          Do not have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Popup Modal */}
          <div className="relative w-3/4 sm:w-1/3 bg-white !p-6 rounded-lg shadow-lg z-50">
            <p className="text-gray-700">Login successful!</p>
            <button
              onClick={handleSuccessClose}
              className="!mt-4 !px-4 !py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-800"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
