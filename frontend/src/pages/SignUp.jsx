import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Custom validation
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username, // Ensure these match Strapi's expected fields
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (response.ok) {
        setSuccessMessage("Account created! Sign In now.");
        setFormData({ username: "", email: "", password: "" }); // Reset form
      } else {
        setErrorMessage(data?.error?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white !px-3 lg:!px-6 !py-10">
      <div className="bg-white shadow-lg rounded-lg !p-5 sm:!p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-lg md:text-xl font-medium text-center text-gray-800 !mb-6">
          Create an Account
        </h2>

        {successMessage && (
          <p className="text-green-600 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-center">{errorMessage}</p>
        )}

        <form className="!space-y-4 text-sm" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium !mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium !mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium !mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold !py-2 !px-4 !mt-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>

          {/* Login Link */}
          <p className="text-[0.85rem] text-center text-gray-600 !mt-4">
            Already have an account?{" "}
            <Link to="/login " className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
