import type { FC } from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: FC = () => {
  return <Outlet />;
};
export default PublicLayout;
