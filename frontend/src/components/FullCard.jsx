import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import { hi as hiBase } from "date-fns/locale";
import { Link } from "react-router-dom";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";

const FullCard = ({ articles }) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!articles || articles.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  const article = articles[currentIndex];
  const {
    id,
    englishTitle,
    hindiTitle,
    coverImage,
    englishAuthor,
    hindiAuthor,
    createdAt,
    category,
    timeToRead,
  } = article;

  // Modified Hindi locale to keep English digits
  const hiWithEnglishDigits = {
    ...hiBase,
    formatDistance: (...args) => {
      const result = hiBase.formatDistance(...args);
      // Replace Hindi digits with English digits
      return result.replace(/[०-९]/g, (digit) => "०१२३४५६७८९".indexOf(digit));
    },
  };

  const formattedcreatedAt = createdAt
    ? formatDistanceToNowStrict(new Date(createdAt), {
        addSuffix: true,
        locale: language === "Hindi" ? hiWithEnglishDigits : enUS,
      })
    : language === "Hindi"
    ? "हाल ही में"
    : "Recently";

  const coverImageUrl = coverImage
    ? `${import.meta.env.VITE_API_URL}${coverImage.url}`
    : null;

  // Conditionally render title, author, and body based on language
  const title = language === "Hindi" ? hindiTitle : englishTitle;
  const author = language === "Hindi" ? hindiAuthor : englishAuthor;
  const readingTimeText =
    language === "Hindi"
      ? `${timeToRead} मिनट पढ़ने का समय`
      : `${timeToRead} min read`;

  return (
    <div className="relative w-full">
      <Link to={`/article/${id}`} className="block">
        {/* Card */}
        <div className="relative rounded-lg overflow-hidden bg-white text-white h-80 lg:h-100 xl:h-80 group">
          {/* Background Image */}
          <img
            src={coverImageUrl}
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            alt={title}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
          {/* Content */}
          <div className="absolute bottom-0 flex flex-col justify-center gap-4 !py-6 !px-14">
            <div className="flex flex-col xs:inline text-sm md:text-base">
              <span>{author}</span>
              <span className="hidden xs:inline"> | </span>
              <span>{formattedcreatedAt}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-medium">{title}</h3>
            <div className="flex flex-col xs:inline text-sm md:text-base">
              <span className="text-red-400 font-medium">
                {translations[language][category]}
              </span>
              <span className="hidden xs:inline"> | </span>
              <span>{readingTimeText}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full !px-4">
        <button
          className="absolute top-1/2 left-8 -translate-1/2 bg-gray-700 text-white w-8 h-8 rounded-full flex justify-center items-center cursor-pointer z-10 hover:bg-gray-500"
          onClick={prevSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-1 -translate-1/2 bg-gray-700 text-white w-8 h-8 rounded-full flex justify-center items-center cursor-pointer z-10 hover:bg-gray-500"
          onClick={nextSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

FullCard.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      englishTitle: PropTypes.string,
      hindiTitle: PropTypes.string,
      coverImage: PropTypes.shape({
        url: PropTypes.string,
      }),
      englishAuthor: PropTypes.string,
      hindiAuthor: PropTypes.string,
      createdAt: PropTypes.string,
      category: PropTypes.string,
      timeToRead: PropTypes.number,
    })
  ),
};

export default FullCard;
