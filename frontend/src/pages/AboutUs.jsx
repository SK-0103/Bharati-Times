import { useEffect } from "react";
import useLanguage from "../context/useLanguage";
import translations from "../utils/translation";
import {
  Microscope,
  Newspaper,
  Binoculars,
  KeyRound,
  Landmark,
  Cpu,
  Briefcase,
  HeartPulse,
  Clapperboard,
  Trophy,
  Globe,
  FileCheck,
  Fan,
  AlarmClockCheck,
  Users,
} from "lucide-react";

const AboutUs = () => {
  const { language } = useLanguage();

  const topics = [
    {
      icon: <Newspaper className="w-8 h-8 text-red-600" />,
      title: translations[language].whatWeCover1,
      desc: translations[language].whatWeCover1Desc,
    },
    {
      icon: <Landmark className="w-8 h-8 text-blue-600" />,
      title: translations[language].whatWeCover2,
      desc: translations[language].whatWeCover2Desc,
    },
    {
      icon: <Cpu className="w-8 h-8 text-green-600" />,
      title: translations[language].whatWeCover3,
      desc: translations[language].whatWeCover3Desc,
    },
    {
      icon: <Briefcase className="w-8 h-8 text-yellow-600" />,
      title: translations[language].whatWeCover4,
      desc: translations[language].whatWeCover4Desc,
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-pink-600" />,
      title: translations[language].whatWeCover5,
      desc: translations[language].whatWeCover5Desc,
    },
    {
      icon: <Clapperboard className="w-8 h-8 text-purple-600" />,
      title: translations[language].whatWeCover6,
      desc: translations[language].whatWeCover6Desc,
    },
    {
      icon: <Trophy className="w-8 h-8 text-orange-600" />,
      title: translations[language].whatWeCover7,
      desc: translations[language].whatWeCover7Desc,
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      title: translations[language].whatWeCover8,
      desc: translations[language].whatWeCover8Desc,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col bg-white">
      <section
        className="relative h-96 w-full bg-cover bg-center"
        style={{ backgroundImage: "url('../../aboutus.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Heading */}
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 text-center text-white !px-12">
          <h1 className="text-2xl md:text-5xl font-bold tracking-widest w-2/3">
            {translations[language].aboutUs}
          </h1>
          <p className="text-white text-base md:text-xl !mt-4 leading-relaxed md:w-2/3">
            {translations[language].aboutStart}
          </p>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row gap-8 !px-6 md:!px-20 !py-16">
        {/* Heading first on small screens */}
        <div className="lg:hidden flex items-center">
          <h2 className="text-xl md:text-3xl font-semibold text-gray-800">
            {translations[language].ourMission}
          </h2>
        </div>

        <div className="lg:w-3/4">
          <ul className="!space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <Microscope className="w-6 h-6 text-red-600" />
              <span className="text-sm xs:text-base md:text-lg font-medium">
                {translations[language].mission1}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Newspaper className="w-6 h-6 text-blue-600" />
              <span className="text-sm xs:text-base md:text-lg font-medium">
                {translations[language].mission2}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Binoculars className="w-6 h-6 text-green-600" />
              <span className="text-sm xs:text-base md:text-lg font-medium">
                {translations[language].mission3}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <KeyRound className="w-6 h-6 text-pink-600" />
              <span className="text-sm xs:text-base md:text-lg font-medium">
                {translations[language].mission4}
              </span>
            </li>
          </ul>
        </div>

        {/* Heading on larger screens */}
        <div className="hidden lg:flex items-center lg:justify-end lg:w-1/4 lg:border-l-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-right">
            {translations[language].ourMission}
          </h2>
        </div>
      </section>

      <section className="flex flex-col gap-8 bg-red-700 !px-6 md:!px-20 !py-16 text-white">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          {translations[language].whatWeCover}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topics.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 bg-gray-100 text-gray-800 rounded-xl shadow-lg !px-4 !py-6 text-center"
            >
              {item.icon}
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm xs:text-base text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col lg:flex-row gap-8 !px-6 md:!px-20 !py-16">
        <div className="flex items-center lg:w-1/4 lg:border-r-4">
          <h2 className="text-xl md:text-3xl font-semibold text-gray-800">
            {translations[language].whyChoose}
          </h2>
        </div>

        <div className="lg:w-3/4 lg:!pl-8">
          <ul className="!space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-red-600" />
              <span className="text-sm xs:text-base md:text-lg font-medium">
                {translations[language].whyChoose1}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Fan className="w-6 h-6 text-blue-600" />
              <span className="text-sm xs:text-base md:text-lg font-medium">
                {translations[language].whyChoose2}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <AlarmClockCheck className="w-6 h-6 text-green-600" />
              <span className="text-sm xs:text-base md:text-lg font-medium">
                {translations[language].whyChoose3}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Users className="w-6 h-6 text-pink-600" />
              <span className="text-sm xs:text-base md:text-lg font-medium">
                {translations[language].whyChoose4}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-8 md:gap-16 bg-blue-950 text-white !px-6 md:!px-20 !py-10">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          {translations[language].joinCommunity}
        </h2>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-3/5">
            <p className="text-sm xs:text-base text-center md:text-xl md:text-left text-gray-300">
              {translations[language].joinCommunityDesc}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 w-full md:w-2/5">
            <form className="flex flex-col items-center gap-4 w-full">
              <input
                type="email"
                placeholder={translations[language].enterEmail}
                className="w-full !px-4 !py-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-medium !py-2 !px-6 rounded-lg shadow-md w-full"
              >
                {translations[language].subscribeNewsletter}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-center text-sm xs:text-base md:text-lg">
          <p className="">{translations[language].thanksForChoosing}</p>
          <p className="">{translations[language].communityEnd}</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
