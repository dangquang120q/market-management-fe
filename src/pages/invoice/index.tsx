import { Button, Divider, Space, TableProps } from "antd";
import NumberFormat from "components/NumberFormat";
import TableSearch from "components/TableSearch";
import { IInvoice } from "constant/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { invoiceService } from "services/invoice";

const InvoicePage: FC = () => {
  const [invoices, setInvoices] = useState<Array<IInvoice>>([]);
  const navigate = useNavigate();
  const columns: TableProps<IInvoice>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render(_value, _record, index) {
        return index + 1;
      },
    },
    {
      title: "Mã HĐ",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã NV",
      dataIndex: "staffId",
      key: "staffId",
    },
    {
      title: "Mã KH",
      dataIndex: "memberId",
      key: "memberId",
    },
    {
      title: "Tổng giá trị",
      dataIndex: "total",
      key: "total",
      render: (value) => (
        <p>
          <NumberFormat value={value} /> đ
        </p>
      ),
    },
    {
      title: "Tổng thanh toán",
      dataIndex: "total",
      key: "total",
      render: (value, rec) => (
        <p>
          <NumberFormat value={value - rec.reducedAmount * 1000} /> đ
        </p>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
      sorter: (a, b) =>
        dayjs(a.createdDate).unix() - dayjs(b.createdDate).unix(),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value: string) => {
        return (
          <Space>
            <Button
              type="link"
              onClick={() => {
                navigate(ROUTE_URL.INVOICE + `/detail/${value}`);
              }}
            >
              Detail
            </Button>
          </Space>
        );
      },
    },
  ];
  const getListInvoice = async () => {
    const res = await invoiceService.getListInvoice();
    setInvoices(res);
  };
  useEffect(() => {
    getListInvoice();
  }, []);
  return (
    <div className="product-page">
      <h1 style={{ marginBottom: 20 }}>Danh sách hóa đơn bán hàng</h1>
      <Divider />
      <TableSearch columns={columns} data={invoices} />
    </div>
  );
};
export default InvoicePage;
