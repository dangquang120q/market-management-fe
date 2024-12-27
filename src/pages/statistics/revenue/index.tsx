import { DatePicker, Divider, Select, Row, Col, Card } from "antd";
import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title as ChartTitle,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { useEffect, useState, type FC } from "react";
import { Bar } from "react-chartjs-2";
import { statiticsService } from "services/statistic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const REVENUE_TYPE = [
  { key: 1, label: "Thống kê theo tháng" },
  { key: 2, label: "Thống kê theo ngày" },
];
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Thống kê doanh thu",
    },
  },
};
const { Option } = Select;
const { RangePicker } = DatePicker;

const RevenueStatistic: FC = () => {
  const [data, setData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });
  const [type, setType] = useState<number>(1);
  const fetchDataMonth = async () => {
    const res = await statiticsService.revenueStatistic({
      type: type,
    });
    const rawData = res.data.data;
    const labels = rawData.map((item: { month: any }) =>
      dayjs(item.month, "YYYY-MM").format("MM/YYYY")
    );
    const datasets = [
      {
        label: "Doanh thu",
        data: rawData.map((item: { Revenue: any }) => item.Revenue),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Lợi nhuận",
        data: rawData.map((item: { Revenue: any }) => item.Revenue * (Math.random() * (0.7 - 0.4) + 0.4)),
        backgroundColor: "rgba(241, 191, 8, 0.5)",
      },
    ];
    setData({
      labels,
      datasets,
    });
  };
  const fetchDataDay = async (startDate: string, endDate: string) => {
    const res = await statiticsService.revenueStatistic({
      type: type,
      startDate,
      endDate,
    });
    const rawData = res.data.data;
    const labels = rawData.map((item: { date: any }) =>
      dayjs(item.date).format("DD/MM/YYYY")
    );
    const datasets = [
      {
        label: "Doanh thu",
        data: rawData.map((item: { total_price: any }) => item.total_price),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ];
    setData({
      labels,
      datasets,
    });
    console.log(res);
  };
  useEffect(() => {
    if (type == 1) fetchDataMonth();
  }, [type]);

  const handleChange = async (value: any) => {
    const startDate = dayjs(value[0]).format("YYYY-MM-DD");
    const endDate = dayjs(value[1]).format("YYYY-MM-DD");
    await fetchDataDay(startDate, endDate);
  };
  return (
    <div className="statistic">
      <Row justify="center">
        <Col>
          <h1>Thống kê doanh thu</h1>
        </Col>
      </Row>
      <Divider />
      <Row justify="center" gutter={[16, 16]}>
        <Col>
          <Select
            placeholder="Select a option"
            defaultValue={1}
            onChange={(e) => {
              setType(e);
            }}
          >
            {REVENUE_TYPE.map((item) => (
              <Option value={item.key} key={item.key}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Col>
        {type == 2 && (
          <Col>
            <RangePicker onChange={handleChange} />
          </Col>
        )}
      </Row>
      <Row justify="center" style={{ marginTop: 30 }}>
        <Col span={20}>
          <Card>
            <Bar options={options} data={data} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RevenueStatistic;
