import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";

const BreakingSlider = ({ articles }) => {
  const { language } = useLanguage();
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const scrollNews = () => {
      if (scrollContainer) {
        scrollAmount += 1;
        scrollContainer.scrollLeft = scrollAmount;

        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
    };

    const interval = setInterval(scrollNews, 30);

    return () => clearInterval(interval);
  }, []);

  const sortedArticles = [...articles]
    .filter((article) => article.isBreakingNews)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="flex items-center bg-white border w-full overflow-hidden">
      {/* Fixed Box on the Left */}
      <div className="bg-red-600 !py-2 !px-3 lg:!pl-6 text-sm md:text-md font-bold w-7/20 sm:w-1/5 text-white">
        {translations[language].breaking} :
      </div>

      {/* Continuous Scrolling News */}
      <div
        ref={scrollRef}
        className="relative flex overflow-hidden w-13/20 sm:w-4/5 whitespace-nowrap"
      >
        <div className="flex !space-x-8">
          {sortedArticles.concat(sortedArticles).map((item, i) => {
            const title =
              language === "Hindi" ? item.hindiTitle : item.englishTitle;

            return (
              <div key={i} className="flex flex-col !px-4">
                <Link
                  to={`/article/${item.id}`}
                  className="text-sm md:text-md flex-shrink-0 inline-block hover:underline"
                >
                  {title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

BreakingSlider.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      englishTitle: PropTypes.string,
      hindiTitle: PropTypes.string,
      createdAt: PropTypes.string,
      isBreakingNews: PropTypes.bool,
    })
  ),
};

export default BreakingSlider;
