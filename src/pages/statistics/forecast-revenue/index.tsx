import { Divider, Row, Col, Card, Spin } from "antd";
import {
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title as ChartTitle,
  Tooltip,
} from "chart.js";
import { APP_NAME } from "constant";
import { useEffect, useState, type FC } from "react";
import { Line } from "react-chartjs-2";
// import { statiticsService } from "services/statistic"; // Uncomment this line when API is available
import dayjs from "dayjs";
import { statiticsService } from "services/statistic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  ChartTitle,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Dự báo doanh thu",
    },
  },
};

const ForecastRevenueStatistic: FC = () => {
  const [data, setData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchForecastProductRevenue = async () => {
    setLoading(true);
    const res = await statiticsService.forecastProductRevenue(); // Uncomment this line when API is available
    // const res =
    // {
    //     "error": false,
    //     "responseTimestamp": "2024-12-24T05:40:55.394Z",
    //     "statusCode": 200,
    //     "data": {
    //         "revenueForecastByMonth": [
    //             {
    //                 "month": "2025-01",
    //                 "totalRevenue": 133669797.68673763
    //             },
    //             {
    //                 "month": "2025-02",
    //                 "totalRevenue": 101789064.51950459
    //             },
    //             {
    //                 "month": "2025-03",
    //                 "totalRevenue": 53027571.30623853
    //             }
    //         ]
    //     }
    // }
    const rawData = res.data.data.revenueForecastByMonth; // Uncomment this line when API is available
    // const rawData = res.data.revenueForecastByMonth; // Comment this line when API is available
    const labels = rawData.map((item: { month: string }) =>
      dayjs(item.month, "YYYY-MM").format("MM/YYYY")
    );
    const datasets = [
      {
        label: "Dự báo doanh thu",
        data: rawData.map((item: { totalRevenue: number }) => item.totalRevenue),
        borderColor: "rgba(53, 162, 235, 0.5)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        fill: true,
      },
    ];
    setData({
      labels,
      datasets,
    });
    setLoading(false);
  };

  useEffect(() => {
    document.title = `Dự báo doanh thu - ${APP_NAME}`;
    fetchForecastProductRevenue();
  }, []);

  return (
    <div className="statistic">
      <Row justify="center">
        <Col>
          <h1>Dự báo doanh thu</h1>
        </Col>
      </Row>
      <Divider />
      <Row justify="center" style={{ marginTop: 30 }}>
        <Col span={20}>
          <Card>
            <Spin spinning={loading}>
              <Line options={options} data={data} />
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ForecastRevenueStatistic;
