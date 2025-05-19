import { useState, useEffect } from "react";

const FullCard = () => {
  const ads = [
    "../../ad1.jpg",
    "../../ad2.jpg",
    "../../ad3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ads.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]); // Restart interval on slide change

  return (
    <div className="relative w-full">
      {/* Card */}
      <div className="relative rounded-lg overflow-hidden bg-white text-white h-64 md:h-80">
        {/* Background Image */}
        <img
          src="../../bvicam.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="bvicam"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {/* Ad Content */}
        <div className="absolute bottom-0 flex flex-col justify-center items-center w-full h-full !px-16">
          <img src={ads[currentIndex]} className="max-w-full max-h-full object-contain" alt="ads" />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full !px-4">
        <button
          className="absolute top-1/2 left-8 -translate-1/2 bg-gray-700 text-white w-8 h-8 rounded-full flex justify-center items-center cursor-pointer z-10 hover:bg-gray-500"
          onClick={prevSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-0 -translate-1/2 bg-gray-700 text-white w-8 h-8 rounded-full flex justify-center items-center cursor-pointer z-10 hover:bg-gray-500"
          onClick={nextSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FullCard;
