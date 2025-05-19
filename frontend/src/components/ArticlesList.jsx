import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";

const ArticlesList = ({ articles }) => {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [isManualNavigation, setIsManualNavigation] = useState(false); // Track user navigation
  const pageSize = 10;
  const totalArticles = articles ? articles.length : 0;
  const totalPages = Math.ceil(totalArticles / pageSize);

  const listRef = useRef(null);

  useEffect(() => {
    if (isManualNavigation && listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsManualNavigation(false); // Reset after scrolling
    }
  }, [currentPage, isManualNavigation]);

  const handlePageChange = (newPage) => {
    setIsManualNavigation(true); // Set navigation flag
    setCurrentPage(newPage);
  };

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div ref={listRef} className="border rounded-lg !pb-4 overflow-hidden">
      <div className="grid grid-cols-1">
        {paginatedArticles.map((article) => {
          const title =
            language === "Hindi" ? article.hindiTitle : article.englishTitle;

          return (
            <Link
              to={`/article/${article.id}`}
              key={article.id}
              className="block"
            >
              <div className="flex gap-3 overflow-hidden bg-white group !px-3 !py-3 border-b-1 hover:bg-gray-100">
                {/* Article Details */}
                <div className="flex flex-col justify-center gap-1 w-2/3">
                  <h3 className="text-sm sm:text-base font-medium sidecard-title">
                    {title}
                  </h3>
                </div>

                {/* Article Image */}
                <div className="w-1/3 relative overflow-hidden rounded-lg">
                  <img
                    src={
                      article.coverImage
                        ? `http://localhost:1337${article.coverImage.url}`
                        : "../../tech.jpg"
                    }
                    className="w-full h-24 object-cover object-top rounded-lg transform transition-transform duration-500 group-hover:scale-110"
                    alt={title}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center !mt-4 gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`!px-4 !py-2 bg-gray-200 rounded text-sm ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {translations[language].previous}
        </button>

        {totalPages > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`text-base hover:underline cursor-pointer ${
                currentPage === 1 ? "text-black underline" : "text-gray-700"
              }`}
            >
              1
            </button>

            {currentPage > 2 && currentPage < totalPages - 2 && (
              <span className="text-gray-500">...</span>
            )}

            {totalPages > 1 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`text-base hover:underline cursor-pointer ${
                  currentPage === totalPages
                    ? "text-black underline"
                    : "text-gray-700"
                }`}
              >
                {totalPages}
              </button>
            )}
          </>
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`!px-4 !py-2 bg-gray-200 rounded text-sm ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {translations[language].next}
        </button>
      </div>
    </div>
  );
};

// PropTypes
ArticlesList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      englishTitle: PropTypes.string,
      hindiTitle: PropTypes.string,
      coverImage: PropTypes.shape({
        url: PropTypes.string,
      }),
    })
  ),
};

export default ArticlesList;
