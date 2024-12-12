/* eslint-disable react-refresh/only-export-components */
import { withTranslation } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return <RouterProvider router={router} />;
}

export default withTranslation()(App);
