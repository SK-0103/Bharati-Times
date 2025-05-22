import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import { hi as hiBase } from "date-fns/locale";
import { Link } from "react-router-dom";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";

const SideCard = ({ article }) => {
  const { language } = useLanguage();

  if (!article) return null;

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
    ? `http://localhost:1337${coverImage.url}`
    : null;

  // Conditionally render title, author, and body based on language
  const title = language === "Hindi" ? hindiTitle : englishTitle;
  const author = language === "Hindi" ? hindiAuthor : englishAuthor;
  const readingTimeText =
    language === "Hindi"
      ? `${timeToRead} मिनट पढ़ने का समय`
      : `${timeToRead} min read`;

  return (
    <Link
      to={`/article/${id}`}
      className="flex flex-col gap-3 group transition-all duration-300 hover:translate-y-[-4px]"
    >
      <div className="relative w-full h-48 overflow-hidden rounded-lg">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{author || "Unknown Author"}</span>
          <span>•</span>
          <span>{formattedcreatedAt}</span>
        </div>
        <div className="flex flex-col xs:inline md:flex xl:inline text-sm text-gray-600">
          <span className="text-red-700 font-medium ">
            {translations[language][category]}
          </span>
          <span className="hidden xs:inline md:hidden xl:inline"> | </span>
          <span className="">{readingTimeText}</span>
        </div>
      </div>
    </Link>
  );
};

SideCard.propTypes = {
  article: PropTypes.shape({
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
  }),
};

export default SideCard;
