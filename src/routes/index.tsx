import PriveLayout from "pages/layout/Private";
import PublicLayout from "pages/layout/Public";
import LoginPage from "pages/login";
import { Navigate, createBrowserRouter } from "react-router-dom";

import {
  BarChartOutlined,
  GiftOutlined,
  HddOutlined,
  IdcardOutlined,
  InboxOutlined,
  ProfileOutlined,
  RiseOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  StockOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Booth from "pages/booth";
import Category from "pages/category";
import InvoicePage from "pages/invoice";
import Invoice from "pages/invoice/create";
import MemberPage from "pages/member";
import Product from "pages/product";
import ReceiptPage from "pages/receipt";
import Receipt from "pages/receipt/create";
import Staff from "pages/staff";
import ProductsStatistic from "pages/statistics/products";
import RevenueStatistic from "pages/statistics/revenue";
import Supplier from "pages/supplier";
import InvoiceDetail from "pages/invoice/detail";
import ReceiptDetail from "pages/receipt/detail";
import ProductShipment from "pages/shipment";
import Promotional from "pages/promotional";
import PromotionalDetail from "pages/promotional/detail";
import ForecastDemandStatistic from "pages/statistics/forecast-demand";
import ForecastRevenueStatistic from "pages/statistics/forecast-revenue";

export const ROUTE_URL = {
  HOME: "/",
  LOGIN: "/login",
  MEMBER: "/member",
  PRODUCT: "/product",
  CATEGORY: "/category",
  SUPPLIER: "/supplier",
  BOOTH: "/booth",
  STAFF: "/staff",
  CREATE_INVOICE: "/invoice/create",
  INVOICE: "/invoice",
  INVENTORY: "/inventory",
  PROMOTIONAL: "/promotional",
  CREATE_RECEIPT: "/receipt/create",
  RECEIPT: "/receipt",
  REVENUE_STATISTIC: "/statistic/revenue",
  PRODUCT_STATISTIC: "/statistic/product",
  FORECAST_DEMAND_STATISTIC: "/statistic/forecast-demand",
  FORECAST_REVENUE_STATISTIC: "/statistic/forecast-revenue",
  INVOICE_DETAIL: "/invoice/detail/:id",
  RECEIPT_DETAIL: "/receipt/detail/:id",
  PROMOTIONAL_DETAIL: "/promotional/detail/:id",
  SHIPMENT: "/product/shipment/:id",
};
const routes = [
  {
    path: ROUTE_URL.LOGIN,
    element: <PublicLayout />,
    children: [
      {
        path: ROUTE_URL.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: ROUTE_URL.HOME,
    element: <PriveLayout />,
    children: [
      {
        path: ROUTE_URL.INVOICE_DETAIL,
        element: <InvoiceDetail />,
      },
      {
        path: ROUTE_URL.REVENUE_STATISTIC,
        element: <RevenueStatistic />,
      },
      {
        path: ROUTE_URL.PRODUCT_STATISTIC,
        element: <ProductsStatistic />,
      },
      {
        path: ROUTE_URL.FORECAST_DEMAND_STATISTIC,
        element: <ForecastDemandStatistic />,
      },
      {
        path: ROUTE_URL.FORECAST_REVENUE_STATISTIC,
        element: <ForecastRevenueStatistic />,
      },
      {
        path: ROUTE_URL.MEMBER,
        element: <MemberPage />,
      },
      {
        path: ROUTE_URL.CREATE_INVOICE,
        element: <Invoice />,
      },
      {
        path: ROUTE_URL.INVOICE,
        element: <InvoicePage />,
      },
      {
        path: ROUTE_URL.PRODUCT,
        element: <Product />,
      },
      {
        path: ROUTE_URL.CATEGORY,
        element: <Category />,
      },
      {
        path: ROUTE_URL.SUPPLIER,
        element: <Supplier />,
      },
      {
        path: ROUTE_URL.PROMOTIONAL,
        element: <Promotional />,
      },
      {
        path: ROUTE_URL.STAFF,
        element: <Staff />,
      },
      {
        path: ROUTE_URL.CREATE_RECEIPT,
        element: <Receipt />,
      },
      {
        path: ROUTE_URL.RECEIPT,
        element: <ReceiptPage />,
      },
      {
        path: ROUTE_URL.RECEIPT_DETAIL,
        element: <ReceiptDetail />,
      },
      {
        path: ROUTE_URL.BOOTH,
        element: <Booth />,
      },
      {
        path: ROUTE_URL.SHIPMENT,
        element: <ProductShipment />,
      },
      {
        path: ROUTE_URL.PROMOTIONAL_DETAIL,
        element: <PromotionalDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTE_URL.PRODUCT} />,
  },
];

export const router = createBrowserRouter(routes);

export const sidebarItems = [
  {
    key: "1",
    icon: <ProfileOutlined />,
    label: "Quản lý bán hàng",
    role: ["admin", "sales"],
    children: [
      {
        key: ROUTE_URL.CREATE_INVOICE,
        icon: <ShoppingCartOutlined />,
        label: "Tạo hóa đơn",
      },
      {
        key: ROUTE_URL.INVOICE,
        icon: <ShopOutlined />,
        label: "Danh sách hóa đơn",
      },
    ],
  },
  {
    key: "2",
    icon: <ProfileOutlined />,
    label: "Quản lý nhập hàng",
    role: ["admin", "warehouse"],
    children: [
      {
        key: ROUTE_URL.CREATE_RECEIPT,
        icon: <ShoppingCartOutlined />,
        label: "Tạo hóa đơn",
      },
      {
        key: ROUTE_URL.RECEIPT,
        icon: <ShopOutlined />,
        label: "Danh sách hóa đơn",
      },
    ],
  },
  {
    key: ROUTE_URL.MEMBER,
    icon: <IdcardOutlined />,
    label: "Quản lý hội viên",
    role: ["admin", "sales"],
  },
  {
    key: ROUTE_URL.PRODUCT,
    icon: <ShoppingCartOutlined />,
    label: "Quản lý mặt hàng",
    role: ["admin", "sales", "warehouse"],
  },
  {
    key: ROUTE_URL.CATEGORY,
    icon: <InboxOutlined />,
    label: "Quản lý loại hàng",
    role: ["admin", "sales", "warehouse"],
  },
  {
    key: ROUTE_URL.SUPPLIER,
    icon: <TruckOutlined />,
    label: "Quản lý nhà cung cấp",
    role: ["admin", "warehouse"],
  },
  {
    key: ROUTE_URL.BOOTH,
    icon: <HddOutlined />,
    label: "Quản lý gian hàng",
    role: ["admin", "sales", "warehouse"],
  },
  {
    key: ROUTE_URL.STAFF,
    icon: <UserOutlined />,
    label: "Quản lý nhân viên",
    role: ["admin"],
  },
  {
    key: ROUTE_URL.PROMOTIONAL,
    icon: <GiftOutlined />,
    label: "Quản lý khuyến mãi",
    role: ["admin", "sales", "warehouse"],
  },
  {
    key: "3",
    icon: <BarChartOutlined />,
    label: "Báo cáo thống kê",
    role: ["admin", "sales", "warehouse"],

    children: [
      {
        key: ROUTE_URL.REVENUE_STATISTIC,
        icon: <ShoppingCartOutlined />,
        label: "Thống kê doanh thu",
      },
      {
        key: ROUTE_URL.PRODUCT_STATISTIC,
        icon: <ShopOutlined />,
        label: "Thống kê sản phẩm",
      },
      {
        key: ROUTE_URL.FORECAST_DEMAND_STATISTIC,
        icon: <RiseOutlined />,
        label: "Dự báo mặt hàng",
      },
      {
        key: ROUTE_URL.FORECAST_REVENUE_STATISTIC,
        icon: <StockOutlined />,
        label: "Dự báo doanh thu",
      },
    ],
  },
];
