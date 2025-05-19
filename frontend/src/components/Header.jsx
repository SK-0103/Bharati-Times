import { useState, useEffect } from "react";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Header = () => {
  const [formattedDate, setFormattedDate] = useState("");
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    // Function to update the date
    const updateDate = () => {
      const today = new Date();

      if (language === "Hindi") {
        const weekday = translations["Hindi"].weekdays[today.getDay()];
        const date = today.getDate();
        const month = translations["Hindi"].months[today.getMonth()];
        const year = today.getFullYear();

        const formatted = `${weekday}, ${date} ${month}, ${year}`;
        setFormattedDate(formatted);
      } else {
        const formatted = today.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setFormattedDate(formatted);
      }
    };

    updateDate();

    const now = new Date();
    const timeUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) -
      now;

    const midnightTimeout = setTimeout(() => {
      updateDate();
      setInterval(updateDate, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, [language]);

  return (
    <header className="block sm:flex justify-center sm:justify-between !px-3 lg:!px-6 !py-4">
      {/* Left Logo - Hidden on Small Screens */}
      <div className="hidden lg:flex items-center w-1/5">
        <img
          className="w-40 h-auto"
          src="../../logoo.png"
          alt="bvp-logo"
          loading="lazy"
        />
      </div>

      {/* Center Section (Logo + Date & Sign-in for Small Screens) */}
      <div className="flex flex-col gap-2 items-center sm:flex-row sm:justify-between w-full sm:w-1/2 lg:w-2/5">
        <div className="flex justify-center w-full sm:w-auto">
          <img
            src="../../logo.png"
            alt="bharati-times-logo"
            loading="lazy"
            className="h-auto w-auto max-w-full object-contain"
          />
        </div>
        <div className="sm:hidden w-full flex justify-end gap-4">
          <button
            className={`text-sm !px-2 !py-1 cursor-pointer rounded ${
              language === "English" ? "bg-black text-white" : ""
            }`}
            onClick={() => {
              setLanguage("English");
            }}
          >
            English
          </button>
          <button
            className={`text-sm !px-2 !py-1 cursor-pointer rounded ${
              language === "Hindi" ? "bg-black text-white" : ""
            }`}
            onClick={() => {
              setLanguage("Hindi");
            }}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* Right Section - Only Visible on `sm` and Larger */}
      <div className="hidden sm:flex sm:flex-col justify-center items-end gap-2 sm:w-1/2 lg:w-1/5">
        <div className="flex items-center gap-4">
          <button
            className={`text-sm !px-2 !py-1 cursor-pointer rounded ${
              language === "English" ? "bg-black text-white" : "hover:bg-gray-300"
            }`}
            onClick={() => {
              setLanguage("English");
            }}
          >
            English
          </button>
          <button
            className={`text-sm !px-2 !py-1 cursor-pointer rounded ${
              language === "Hindi" ? "bg-black text-white" : "hover:bg-gray-300"
            }`}
            onClick={() => {
              setLanguage("Hindi");
            }}
          >
            हिन्दी
          </button>
        </div>
        <p className="text-base font-medium text-gray-700">{formattedDate}</p>
        <div className="flex gap-2 text-gray-700 font-normal text-sm">
          <a
            href="https://www.facebook.com/BharatiTimesIndia/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-gray-900 hover:font-medium"
          >
            <FaFacebook className="text-2xl" />
          </a>

          <a
            href="https://www.instagram.com/bharati.times/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-pink-600 hover:text-gray-900 hover:font-medium"
          >
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
