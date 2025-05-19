import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";

import Loading from "../components/Loading";
import Error from "../components/Error";
import PdfCard from "../components/PdfCard";

const CurrentIssue = () => {
  const { language } = useLanguage();

  const { data, error, loading } = useFetch('/api/archives');

  // Format and get the most recent newspaper
  const recentNewspapers = Array.isArray(data)
    ? data
        .map((item) => {
          const title =
            language === "Hindi" ? item.hindiTitle : item.englishTitle;
          const pdfLink =
            language === "Hindi"
              ? item.hindiPdfLink?.url
              : item.englishPdfLink?.url;
          return {
            id: item.id,
            englishTitle: item.englishTitle,
            hindiTitle: item.hindiTitle,
            englishPdfLink: item.englishPdfLink,
            hindiPdfLink: item.hindiPdfLink,
            createdAt: item.createdAt,
            title,
            date: item.createdAt?.split("T")[0],
            pdfLink: pdfLink ? `http://localhost:1337${pdfLink}` : "#",
          };
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 1)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loading message={translations[language].pleaseWait} />;
  }

  if (error) {
    console.error('Error details:', error);
    return <Error message={`${translations[language].errorMessage}: ${error?.message || 'Failed to fetch data'}`} />;
  }

  return (
    <div className="flex gap-4 !px-3 lg:!px-6 !py-10 bg-white">
      <main className="w-full flex flex-col items-center gap-8 md:gap-10">
        <div className="w-full xs:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
          <h2 className="text-xl text-center font-medium inline tracking-widest">
            {translations[language].currentIssue}
          </h2>
        </div>
        {error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <section className="w-full xs:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col gap-10">
            {recentNewspapers.map((item) => (
              <PdfCard
                key={item.id}
                englishTitle={item.englishTitle}
                hindiTitle={item.hindiTitle}
                date={item.date}
                englishPdfLink={
                  item.englishPdfLink?.url
                    ? `http://localhost:1337${item.englishPdfLink.url}`
                    : null
                }
                hindiPdfLink={
                  item.hindiPdfLink?.url
                    ? `http://localhost:1337${item.hindiPdfLink.url}`
                    : null
                }
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default CurrentIssue;
