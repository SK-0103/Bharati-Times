import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";

const PdfCard = ({
  englishTitle,
  hindiTitle,
  date,
  englishPdfLink,
  hindiPdfLink,
}) => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const selectedTitle = language === "Hindi" ? hindiTitle : englishTitle;
  const selectedPdfLink = language === "Hindi" ? hindiPdfLink : englishPdfLink;

  useEffect(() => {
    const checkPdfAccess = async () => {
      if (!selectedPdfLink) {
        setError("No PDF available");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(selectedPdfLink, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`PDF not accessible: ${response.status} ${response.statusText}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking PDF:", error);
        setError(`Failed to access PDF: ${error.message}`);
        setIsLoading(false);
      }
    };

    checkPdfAccess();
  }, [selectedPdfLink]);

  const handleClick = () => {
    if (!selectedPdfLink) return;
    navigate("/viewer", {
      state: { englishTitle, hindiTitle, date, englishPdfLink, hindiPdfLink },
    });
  };

  return (
    <div
      className={`relative group overflow-hidden rounded-lg shadow-lg border border-gray-300 ${
        selectedPdfLink ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      onClick={handleClick}
    >
      {isLoading ? (
        <div className="w-full h-[300px] bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-500">
            {translations[language].loading}
          </span>
        </div>
      ) : error ? (
        <div className="w-full h-[300px] bg-gray-200 flex flex-col items-center justify-center p-4">
          <span className="text-red-500 text-center mb-2">{error}</span>
          {selectedPdfLink && (
            <a 
              href={selectedPdfLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline"
              onClick={(e) => e.stopPropagation()}
            >
              Open PDF directly
            </a>
          )}
        </div>
      ) : (
        <div className="w-full h-[300px] relative bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <svg 
              className="w-16 h-16 mx-auto mb-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedTitle}</h3>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300">
        <h3 className="text-white text-lg font-semibold text-center px-4">{selectedTitle}</h3>
        <p className="text-gray-300">{date}</p>
      </div>
    </div>
  );
};

PdfCard.propTypes = {
  englishTitle: PropTypes.string,
  hindiTitle: PropTypes.string,
  date: PropTypes.string,
  englishPdfLink: PropTypes.string,
  hindiPdfLink: PropTypes.string,
};

export default PdfCard;
