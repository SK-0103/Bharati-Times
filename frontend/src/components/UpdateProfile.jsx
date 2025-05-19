import { useState } from "react";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    email: "kaiparker.tvd11@gmail.com",
    mobileNumber: "",
    firstName: "Malachai",
    lastName: "Parker",
    dob: { day: "DD", month: "MM", year: "YYYY" },
    gender: "",
    country: "India",
    city: "New Delhi",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-3/4 flex flex-col gap-8 bg-white rounded-lg shadow !p-6">
      <h2 className="text-xl font-medium">Update Profile</h2>
      <form className="grid grid-cols-2 gap-4">
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
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium !mb-1"
            htmlFor="contact"
          >
            Contact Number
          </label>
          <input
            className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            id="contact"
            type="tel"
            placeholder="Enter your contact"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium !mb-1"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            id="firstName"
            type="text"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium !mb-1"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            id="lastName"
            type="text"
            placeholder="Enter your last name"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium !mb-1"
            htmlFor="dob"
          >
            Date of Birth
          </label>
          <div className="flex gap-2">
            <select
              name="dobDay"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.dob.day}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dob: { ...prev.dob, day: e.target.value },
                }))
              }
            >
              <option>DD</option>
            </select>
            <select
              name="dobMonth"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.dob.month}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dob: { ...prev.dob, month: e.target.value },
                }))
              }
            >
              <option>MM</option>
            </select>
            <select
              name="dobYear"
              className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.dob.year}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dob: { ...prev.dob, year: e.target.value },
                }))
              }
            >
              <option>YYYY</option>
            </select>
          </div>
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium !mb-1"
            htmlFor="country"
          >
            Gender
          </label>
          <div className="flex items-center !py-2 gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium !mb-1"
            htmlFor="country"
          >
            Country
          </label>
          <input
            className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            id="country"
            type="text"
            placeholder="Enter your country"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium !mb-1"
            htmlFor="city"
          >
            City
          </label>
          <input
            className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            id="city"
            type="text"
            placeholder="Enter your city"
          />
        </div>

        <div className="flex justify-between !mt-6">
          <button className="!px-6 !py-2 bg-blue-800 text-white rounded-lg cursor-pointer hover:bg-gray-800">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
