import { Divider, Row, Col, Card, Table, Spin } from "antd";
import { APP_NAME } from "constant";
import { useEffect, useState, type FC } from "react";
// import { statiticsService } from "services/statistic"; // Uncomment this line when API is available
import { IProduct } from "constant/interface";

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
];

const ForecastDemandStatistic: FC = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState<IProduct[]>([]);
  const [worstSellingProducts, setWorstSellingProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchForecastProductDemand = async () => {
    setLoading(true);
    // const res = await statiticsService.forecastProductDemand(); // Uncomment this line when API is available
    const res = {
      "error": false,
      "responseTimestamp": "2024-12-24T05:28:13.662Z",
      "statusCode": 200,
      "data": {
        "HangBanChay": [
          {
            "id": 2,
            "name": "Bánh quy socola hạt lúa mạch 300g",
            "unit": "gói",
            "total": 0,
            "price": 21500,
            "categoryId": 2,
            "saleTotal": 0
          },
          {
            "id": 7,
            "name": "Nước cam ép Vfresh Vinamilk hộp 1L",
            "unit": "hộp",
            "total": 0,
            "price": 49000,
            "categoryId": 1,
            "saleTotal": 0
          },
          {
            "id": 10,
            "name": "Khăn giấy Kleenex",
            "unit": "gói",
            "total": 0,
            "price": 25000,
            "categoryId": 8,
            "saleTotal": 0
          },
          {
            "id": 11,
            "name": "Bánh mì sandwich",
            "unit": "ổ",
            "total": 0,
            "price": 17000,
            "categoryId": 2,
            "saleTotal": 0
          },
          {
            "id": 13,
            "name": "Sữa tươi Vinamilk",
            "unit": "hộp",
            "total": 0,
            "price": 6000,
            "categoryId": 1,
            "saleTotal": 0
          }
        ],
        "HangBanKem": [
          {
            "id": 2,
            "name": "Bánh quy socola hạt lúa mạch 300g",
            "unit": "gói",
            "total": 0,
            "price": 21500,
            "categoryId": 2,
            "saleTotal": 0
          },
          {
            "id": 7,
            "name": "Nước cam ép Vfresh Vinamilk hộp 1L",
            "unit": "hộp",
            "total": 0,
            "price": 49000,
            "categoryId": 1,
            "saleTotal": 0
          },
          {
            "id": 10,
            "name": "Khăn giấy Kleenex",
            "unit": "gói",
            "total": 0,
            "price": 25000,
            "categoryId": 8,
            "saleTotal": 0
          },
          {
            "id": 11,
            "name": "Bánh mì sandwich",
            "unit": "ổ",
            "total": 0,
            "price": 17000,
            "categoryId": 2,
            "saleTotal": 0
          },
          {
            "id": 13,
            "name": "Sữa tươi Vinamilk",
            "unit": "hộp",
            "total": 0,
            "price": 6000,
            "categoryId": 1,
            "saleTotal": 0
          }
        ]
      }
    }; // Comment this line when API is available

    setBestSellingProducts(res.data.HangBanChay); // Comment this line when API is available
    setWorstSellingProducts(res.data.HangBanKem); // Comment this line when API is available

    // setBestSellingProducts(res.data.data.HangBanChay); // Uncomment this line when API is available
    // setWorstSellingProducts(res.data.data.HangBanKem); // Uncomment this line when API is available
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
