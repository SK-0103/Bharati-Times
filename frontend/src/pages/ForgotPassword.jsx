import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link sent to your email.");
      } else {
        setError(data?.error?.message || "Unable to send reset link.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white !px-4 !py-20">
      <div className="bg-white border border-gray-200 shadow-md !p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center !mb-4">
          Enter your email to receive a password reset link.
        </p>

        {message && (
          <p className="text-green-600 text-sm !mb-2 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm !mb-2 text-center">{error}</p>
        )}

        <form onSubmit={handleForgotPassword} className="!space-y-4">
          <div>
            <label className="block text-gray-700 text-sm !mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold !py-2 rounded-lg transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
