import { Divider, Row, Col, Card, Table, Spin } from "antd";
import { APP_NAME } from "constant";
import { useEffect, useState, type FC } from "react";
// import { statiticsService } from "services/statistic"; // Uncomment this line when API is available
import { IProduct } from "constant/interface";
import { statiticsService } from "services/statistic";

const columns = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    render: (text: number) => text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Số lượng còn lại',
    dataIndex: 'total',
    key: 'total',
  },
];

const ForecastDemandStatistic: FC = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState<IProduct[]>([]);
  const [worstSellingProducts, setWorstSellingProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchForecastProductDemand = async () => {
    setLoading(true);
    const res = await statiticsService.forecastProductDemand(); // Uncomment this line when API is available

    // setBestSellingProducts(res.data.HangBanChay); // Comment this line when API is available
    // setWorstSellingProducts(res.data.HangBanKem); // Comment this line when API is available

    setBestSellingProducts(res.data.data.HangBanChay); // Uncomment this line when API is available
    setWorstSellingProducts(res.data.data.HangBanKem); // Uncomment this line when API is available
    setLoading(false);
  };

  useEffect(() => {
    document.title = `Dự báo mặt hàng - ${APP_NAME}`;
    fetchForecastProductDemand();
  }, []);

  return (
    <div className="statistic">
      <Row justify="center">
        <Col>
          <h1>Dự báo mặt hàng</h1>
        </Col>
      </Row>
      <Divider />
      <Row justify="center" style={{ marginTop: 30 }}>
        <Col span={20}>
          <Card title="Sản phẩm bán chạy">
            <Spin spinning={loading}>
              <Table dataSource={bestSellingProducts} columns={columns} rowKey="id" pagination={false} />
            </Spin>
          </Card>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 30 }}>
        <Col span={20}>
          <Card title="Sản phẩm bán kém">
            <Spin spinning={loading}>
              <Table dataSource={worstSellingProducts} columns={columns} rowKey="id" pagination={false} />
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ForecastDemandStatistic;
