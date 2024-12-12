import type { FC } from "react";
import { useTranslation } from "react-i18next";

const HomePage: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="home-page">
      <h1>{t("common.homePage")}</h1>
    </div>
  );
};

export default HomePage;
