import { Tabs, Row, Col, Divider, Card } from "antd";
import BestSeller from "components/page/revenue/products/BestSeller";
import CanceledShipment from "components/page/revenue/products/Cancel";
import Inventory from "components/page/revenue/products/Inventory";
import { useEffect, useState, type FC, type SetStateAction } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTE_URL } from "routes";

const { TabPane } = Tabs;

const ProductsStatistic: FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bestseller");
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("tab");

  const tabList = [
    {
      label: "Sản phẩm bán chạy",
      key: "bestseller",
      children: <BestSeller />,
    },
    {
      label: "Hàng tồn kho",
      key: "inventory",
      children: <Inventory />,
    },
    {
      label: "Hàng đã hủy",
      key: "cancelled",
      children: <CanceledShipment />,
    },
  ];

  const onChangeTab = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
    navigate(ROUTE_URL.PRODUCT_STATISTIC + `?tab=${tab}`, { replace: true });
  };
  useEffect(() => {
    if (currentQuery) {
      setActiveTab(currentQuery);
      navigate(`${ROUTE_URL.PRODUCT_STATISTIC}?tab=${currentQuery}`, {
        replace: true,
      });
    } else {
      navigate(`${ROUTE_URL.PRODUCT_STATISTIC}?tab=${activeTab}`, {
        replace: true,
      });
    }
  }, [currentQuery]);

  return (
    <div className="statistic">
      <Row justify="center">
        <Col>
          <h1>Thống kê sản phẩm</h1>
        </Col>
      </Row>
      <Divider />
      <Row justify="center">
        <Col span={20}>
          <Card style={{ flex: 1, width: "100%" }}>
            <Tabs
              activeKey={activeTab}
              onChange={onChangeTab}
              className="blue-button-tabs"
            >
              {tabList.map((el: any) => (
                <TabPane tab={el.label} key={el.key} children={el.children} />
              ))}
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsStatistic;
