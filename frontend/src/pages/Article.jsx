import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MainCard from "../components/MainCard";
import SideCard from "../components/SideCard";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";

const Article = () => {
  const { language } = useLanguage();
  const { id } = useParams();
  
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
      <div className="text-center !p-8">
        <p className="!mt-4">Loading articles...</p>
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
    <div className="!px-3 lg:!px-6 !py-10 flex flex-col lg:flex-row w-full gap-8 md:gap-10">
      <main className="w-full lg:w-2/3">
        <MainCard article={data} />
      </main>
      <aside className="w-full lg:w-1/3">
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-medium">
            {translations[language].youMayAlsoLike}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
            {shuffledArticles.slice(0, 6).map((article) => (
              <SideCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Article;
