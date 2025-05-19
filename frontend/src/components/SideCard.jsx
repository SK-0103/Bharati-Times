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
    <div className="rounded-lg flex gap-3 overflow-hidden bg-white">
      {/* Article Details */}
      <div className="flex flex-col justify-center gap-1 w-1/2">
        <div className="flex flex-col xs:inline md:flex text-sm text-gray-600">
          <span>{author || "Unknown Author"}</span>
          <span className="hidden xs:inline md:hidden"> | </span>
          <span>{formattedcreatedAt}</span>
        </div>

        <Link
          to={`/article/${id}`}
          className="text-base font-medium sidecard-title hover:underline"
        >
          {title}
        </Link>

        <div className="flex flex-col xs:inline md:flex xl:inline text-sm text-gray-600">
          <span className="text-red-700 font-medium ">
            {translations[language][category]}
          </span>
          <span className="hidden xs:inline md:hidden xl:inline"> | </span>
          <span className="">{readingTimeText}</span>
        </div>
      </div>

      {/* Article Image */}
      <div className="w-1/2 relative overflow-hidden rounded-lg">
        <Link to={`/article/${id}`}>
          <img
            src={coverImageUrl}
            className="w-full object-cover h-full rounded-lg transform transition-transform duration-500 hover:scale-110"
            alt={title}
          />
        </Link>
      </div>
    </div>
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
