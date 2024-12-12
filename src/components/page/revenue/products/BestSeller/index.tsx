import { FC, useEffect, useState } from "react";
import { statiticsService } from "services/statistic";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IProduct } from "constant/interface";
import { Table, TableProps } from "antd";
import NumberFormat from "components/NumberFormat";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
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
      text: "Top 10 sản phẩm bán chạy",
    },
  },
};

const BestSeller: FC = () => {
  const [data, setData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });
  const [dataTable, setDataTable] = useState<Array<IProduct & { sum: number }>>(
    []
  );
  const columns: TableProps<IProduct & { sum: number }>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_value, _record, index) => index + 1,
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (value) => <NumberFormat value={value} />,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Số lượng bán",
      dataIndex: "sum",
      key: "sum",
      sorter: (a, b) => a.sum - b.sum,
    },
    {
      title: "Doanh thu",
      dataIndex: "price",
      key: "price",
      render: (value, record) => (
        <b>
          <NumberFormat value={value * record.sum} />
        </b>
      ),
      sorter: (a, b) => a.price * a.sum - b.price * b.sum,
    },
  ];
  const fetchData = async () => {
    const res = await statiticsService.productStatistics({ type: 1 });
    const rawData = res.data.data;
    setDataTable(rawData);
    const labels = rawData
      .slice(0, 10)
      .map((item: { name: string; sum: number }) => item.name);
    const datasets = [
      {
        label: "Tổng số lượng",
        data: rawData.map((item: { name: string; sum: number }) => item.sum),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ];
    setData({
      labels,
      datasets,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="best-seller">
      <div className="chart" style={{ width: "80%", margin: "auto" }}>
        <Bar options={options} data={data} />
      </div>
      <Table columns={columns} dataSource={dataTable} />
    </div>
  );
};
export default BestSeller;
