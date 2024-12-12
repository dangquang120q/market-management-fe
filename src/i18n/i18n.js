import { initReactI18next } from "react-i18next";

import i18n from "i18next";
import detector from "i18next-browser-languagedetector";

import en from "./locales/en/defaults.json";

const resources = {
  en: {
    translation: en,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: { default: ["en"] },
    nsSeparator: false,
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      lookupQuerystring: "lang",
      lookupCookie: "i18n",
      lookupLocalStorage: "i18App",
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;

export function getCurrentLanguage() {
  return localStorage.getItem("i18App");
}
