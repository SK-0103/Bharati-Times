import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MainCard from "../components/MainCard";
import SideCard from "../components/SideCard";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";

const Article = () => {
  const { language } = useLanguage();
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  
  // Use proxy URLs instead of environment variables
  const { loading, error, data } = useFetch(
    `/api/articles/${id}`
  );

  const {
    loading: allLoading,
    error: allError,
    data: allArticles,
  } = useFetch(`/api/articles`);

  useEffect(() => {
    if (!loading && !allLoading && data && allArticles) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
        setTimeout(() => {
          setIsContentLoaded(true);
        }, 100);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, allLoading, data, allArticles]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  let shuffledArticles = [];
  if (allArticles) {
    const filteredArticles = allArticles.filter(
      (article) => article.category !== "Entertainment"
    );
    shuffledArticles = [...filteredArticles].sort(() => 0.5 - Math.random());
  }

  if (loading || allLoading) {
    return (
      <div className="!px-3 lg:!px-6 !py-10">
        <div className="flex flex-col lg:flex-row w-full gap-8 md:gap-10">
          <div className="w-full lg:w-2/3">
            <div className="skeleton-loading h-96 rounded-lg"></div>
            <div className="skeleton-loading h-8 w-3/4 mt-4 rounded"></div>
            <div className="skeleton-loading h-4 w-1/2 mt-2 rounded"></div>
            <div className="skeleton-loading h-4 w-full mt-4 rounded"></div>
            <div className="skeleton-loading h-4 w-full mt-2 rounded"></div>
            <div className="skeleton-loading h-4 w-3/4 mt-2 rounded"></div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="skeleton-loading h-8 w-48 rounded"></div>
            <div className="grid grid-cols-1 gap-5 mt-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton-loading h-32 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || allError) {
    return (
      <div className="text-center !p-8 text-red-500">
        Error loading articles: {error?.message || allError?.message}
      </div>
    );
  }

  return (
    <div className={`!px-3 lg:!px-6 !py-10 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div className="flex flex-col lg:flex-row w-full gap-8 md:gap-10">
        <main className={`w-full lg:w-2/3 ${isContentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500`}>
          <MainCard article={data} />
        </main>
        <aside className={`w-full lg:w-1/3 ${isContentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-100`}>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-medium">
              {translations[language].youMayAlsoLike}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
              {shuffledArticles.slice(0, 6).map((article, index) => (
                <div 
                  key={article.id} 
                  className={`transition-all duration-300 ${isContentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <SideCard article={article} />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Article;
