import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import { hi as hiBase } from "date-fns/locale";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";

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
    <div className="rounded-lg flex flex-col overflow-hidden bg-white">
      <div className="flex flex-col justify-center !gap-4">
        <h3 className="text-xl md:text-2xl font-medium">{title}</h3>
        <div className="flex flex-col gap-2">
          <p className="text-sm md:text-base text-gray-600">
            {author} | {formattedcreatedAt}
          </p>
          <p className="text-sm md:text-md text-gray-600">
            <span className="text-red-700 font-medium">
              {translations[language][category]}
            </span>{" "}
            <span className="text-gray-600 hidden lg:inline"> | </span>
            <span className="text-gray-600">{readingTimeText}</span>
          </p>
        </div>
        <div className="">
          <img
            src={coverImageUrl}
            className="w-full h-80 lg:h-128 object-cover object-center rounded-lg"
            alt={title}
          />
        </div>
        <p className="text-base text-gray-600">{body}</p>
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
