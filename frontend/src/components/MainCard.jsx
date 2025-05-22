import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import { hi as hiBase } from "date-fns/locale";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const MainCard = ({ article }) => {
  const { language } = useLanguage();

  if (!article) return null;

  const {
    englishTitle,
    hindiTitle,
    coverImage,
    englishAuthor,
    hindiAuthor,
    createdAt,
    category,
    timeToRead,
    englishBody,
    hindiBody,
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
  const body = language === "Hindi" ? hindiBody : englishBody;
  const readingTimeText =
    language === "Hindi"
      ? `${timeToRead} मिनट पढ़ने का समय`
      : `${timeToRead} min read`;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{translations[language].by}</span>
          <span className="font-medium">{author}</span>
          <span>•</span>
          <span>{formattedcreatedAt}</span>
        </div>
      </div>
      <div className="prose prose-lg max-w-none">
        <div className="rich-text-content">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className="text-sm font-medium">{translations[language].category}:</span>
        <Link
          to={`/${category.toLowerCase()}`}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
        >
          {category}
        </Link>
      </div>
    </div>
  );
};

MainCard.propTypes = {
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
    englishBody: PropTypes.string,
    hindiBody: PropTypes.string,
  }),
};

export default MainCard;
