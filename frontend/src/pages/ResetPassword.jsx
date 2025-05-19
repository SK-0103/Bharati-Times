// ResetPassword.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams(); // Get token from URL

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Request body:", { resetPasswordToken: token, password });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resetPasswordToken: token,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful! You can now log in.");
      } else {
        setError(data?.error?.message || "Unable to reset password.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white !px-4 !py-20">
      <div className="bg-white border border-gray-200 shadow-md !p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 text-center !mb-4">
          Enter your new password below.
        </p>

        {message && (
          <p className="text-green-600 text-sm !mb-2 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm !mb-2 text-center">{error}</p>
        )}

        <form onSubmit={handleResetPassword} className="!space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm !mb-1"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm !mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold !py-2 rounded-lg transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
