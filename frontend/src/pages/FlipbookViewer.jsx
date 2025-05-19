import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useLanguage from "../context/useLanguage";
import HTMLFlipBook from "react-pageflip";
import * as pdfjs from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import {
  LuChevronLeft,
  LuChevronRight,
  LuMaximize,
  LuMinimize,
} from "react-icons/lu";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const FlipbookViewer = () => {
  const { state } = useLocation();
  const { englishTitle, hindiTitle, date, englishPdfLink, hindiPdfLink } =
    state || {};

  const { language } = useLanguage();

  const [title, setTitle] = useState(
    language === "Hindi" ? hindiTitle : englishTitle
  );
  const [pdfUrl, setPdfUrl] = useState(
    language === "Hindi" ? hindiPdfLink : englishPdfLink
  );
  useEffect(() => {
    const newUrl = language === "Hindi" ? hindiPdfLink : englishPdfLink;
    const newTitle = language === "Hindi" ? hindiTitle : englishTitle;
    setPdfUrl(newUrl);
    setTitle(newTitle);
  }, [language, englishPdfLink, hindiPdfLink, englishTitle, hindiTitle]);

  const [pageImages, setPageImages] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const flipBookRef = useRef();
  const containerRef = useRef();

  // 🔝 Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 📱 Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadPdfAndConvertToImages = async () => {
      try {
        setPageImages([]); //Clear previous pages
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;

        const images = [];
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const scale = 2;
          const viewport = page.getViewport({ scale });

          if (i === 1) {
            setDimensions({
              width: Math.min(viewport.width, 800),
              height: Math.min(viewport.height, 1000),
            });
          }

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          images.push(canvas.toDataURL("image/png"));
        }

        setPageImages(images);
        setCurrentPage("1");
      } catch (err) {
        console.error("Error processing PDF:", err);
        setError(err.message);
      }
    };

    if (pdfUrl) loadPdfAndConvertToImages();
  }, [pdfUrl]);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const nextPage = () => flipBookRef.current.pageFlip().flipNext();
  const prevPage = () => flipBookRef.current.pageFlip().flipPrev();
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const onFlip = (e) => {
    const index = e.data;

    if (index === 0) {
      setCurrentPage("1");
    } else {
      const leftPage = index + 1;
      const rightPage = leftPage + 1;

      if (rightPage >= pageImages.length) {
        setCurrentPage(`${leftPage}`);
      } else {
        setCurrentPage(`${leftPage}-${rightPage}`);
      }
    }
  };

  if (!pdfUrl) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">No PDF URL provided.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-white flex flex-col items-center justify-center !px-4 !py-10"
    >
      <div className="w-full md:w-4/5 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center bg-gray-600 text-white !py-2 !px-6">
          <h1 className="text-base md:text-xl font-semibold">
            {title} - {date}
          </h1>
          <div className="flex justify-between items-center gap-4 text-sm">
            <span className="text-sm md:text-base text-white font-medium">
              Page {currentPage} of {pageImages.length}
            </span>
            <button
              onClick={toggleFullscreen}
              className="bg-white hover:bg-gray-200 text-gray-800 text-sm md:text-base !px-4 !py-1 rounded"
            >
              {isFullscreen ? <LuMinimize /> : <LuMaximize />}
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Prev Button */}
          {pageImages.length > 0 && (
            <button
              onClick={prevPage}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gray-400 hover:bg-gray-500 text-white !p-2 md:!p-3 rounded-full shadow-lg"
            >
              <LuChevronLeft className="text-base md:text-2xl" />
            </button>
          )}

          {/* Flipbook */}
          <div className="flex items-center justify-center !px-8 md:!px-16 !py-3 bg-white">
            {error ? (
              <p className="text-red-500 text-center">Error: {error}</p>
            ) : pageImages.length === 0 ? (
              <p className="text-gray-600 text-center">Loading PDF...</p>
            ) : (
              <HTMLFlipBook
                width={dimensions.width}
                height={dimensions.height}
                size="stretch"
                flippingTime={800}
                ref={flipBookRef}
                onFlip={onFlip}
                startPage={0}
                useMouseEvents={true}
                showCover={true}
                mobileScrollSupport={true}
                singlePage={isMobileView}
                className=""
                style={{
                  backgroundColor: "#ffffff",
                }}
              >
                {pageImages.map((imgSrc, index) => (
                  <div
                    key={`page_${index + 1}`}
                    className={`bg-white !p-2 ${
                      index === 0 || index === pageImages.length - 1
                        ? "hard"
                        : ""
                    }`}
                    style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)" }}
                  >
                    <img
                      src={imgSrc}
                      alt={`Page ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        border: "1px solid #eee",
                      }}
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            )}
          </div>

          {/* Next Button */}
          {pageImages.length > 0 && (
            <button
              onClick={nextPage}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gray-400 hover:bg-gray-500 text-white !p-2 md:!p-3 rounded-full shadow-lg"
            >
              <LuChevronRight className="text-base md:text-2xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipbookViewer;
