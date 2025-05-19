import { useState, useEffect } from "react";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";

const ContactUs = () => {
  const { language } = useLanguage();

  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    location: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [captchaError, setCaptchaError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCorrectAnswer(num1 + num2);
    setCaptchaQuestion(`${num1} + ${num2} =`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    generateCaptcha();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim())
      newErrors.name = translations[language].nameRequired;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = translations[language].validEmailRequired;
    if (
      !formData.contactNumber.trim() ||
      !/^\d{10}$/.test(formData.contactNumber)
    )
      newErrors.contactNumber = translations[language].validNumberRequired;
    if (!formData.location.trim())
      newErrors.location = translations[language].locationRequired;
    if (!formData.subject.trim())
      newErrors.subject = translations[language].subjectRequired;
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = translations[language].messageLength;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCaptchaError("");

    if (!validateForm()) {
      return;
    }

    const userAnswer = parseInt(captchaInput, 10);
    if (userAnswer !== correctAnswer) {
      setCaptchaError("Incorrect answer. Please try again.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact-forms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        setSuccessMessage("Your message has been submitted successfully!");
        setSubmitError("");
      } else {
        setSubmitError("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setSubmitError(
        "An error occurred. Please try again later.",
        error.message
      );
    }
  };

  const handleSuccessClose = () => {
    setSuccessMessage("");
    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      location: "",
      subject: "",
      message: "",
    });
    setCaptchaInput("");
    generateCaptcha();
  };

  return (
    <div className="flex justify-center items-center bg-white !px-3 lg:!px-6 !py-10">
      <div className="w-full xs:w-2/3 bg-white !p-5 sm:!p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-lg md:text-xl font-medium text-gray-800 !mb-6">
          {translations[language].contactUs}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="md:w-1/2 flex flex-col gap-1">
              <label className="text-gray-700 font-medium">
                {translations[language].name}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={translations[language].name}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full !p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>
            <div className="md:w-1/2 flex flex-col gap-1">
              <label className="text-gray-700 font-medium">
                {translations[language].emailAddress}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder={translations[language].emailAddress}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full !p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="md:w-1/2 flex flex-col gap-1">
              <label className="text-gray-700 font-medium">
                {translations[language].contactNumber}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder={translations[language].contactNumber}
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
                className="w-full !p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-xs">{errors.contactNumber}</p>
              )}
            </div>
            <div className="md:w-1/2 flex flex-col gap-1">
              <label className="text-gray-700 font-medium">
                {translations[language].location}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={translations[language].location}
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full !p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.location && (
                <p className="text-red-500 text-xs">{errors.location}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">
              {translations[language].subject}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={translations[language].subject}
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full !p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.subject && (
              <p className="text-red-500 text-xs">{errors.subject}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">
              {translations[language].message}{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder={translations[language].message}
              rows="4"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full !p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.message && (
              <p className="text-red-500 text-xs">{errors.message}</p>
            )}
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-700 font-medium">
                {captchaQuestion}
              </span>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder={translations[language].answer}
                className="!p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                maxLength={3}
              />
            </div>
            {captchaError && (
              <p className="text-red-500 text-xs">{captchaError}</p>
            )}
          </div>

          {submitError && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            className="w-full !p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none"
          >
            {translations[language].submit}
          </button>
        </form>
      </div>

      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Popup Modal */}
          <div className="relative bg-white !p-6 rounded-lg shadow-lg z-50">
            <p className="text-green-600">{successMessage}</p>
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

export default ContactUs;
