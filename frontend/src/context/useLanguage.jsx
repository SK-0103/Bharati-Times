import { useContext } from "react";
import LanguageContext from "./LanguageContext";

const useLanguage = () => useContext(LanguageContext);

export default useLanguage;
