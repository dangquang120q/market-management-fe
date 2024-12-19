import { BarsOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space, TableProps, Tooltip } from "antd";
import { CommonSearch, CommonTable } from "components/common";
import NumberFormat from "components/NumberFormat";
import { APP_NAME } from "constant";
import { IInvoice } from "constant/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { invoiceService } from "services/invoice";

const InvoicePage: FC = () => {
  const [invoices, setInvoices] = useState<Array<IInvoice>>([]);
  const [originalInvoices, setOriginalInvoices] = useState<Array<IInvoice>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (value: string) => {
        return (
          <Space>
            <Tooltip placement="top" title="Chi tiết">
              <Button
                type="link"
                size="small"
                icon={<BarsOutlined />}
                onClick={() => {
                  navigate(ROUTE_URL.INVOICE + `/detail/${value}`);
                }}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  const getListInvoice = async () => {
    setIsLoading(true);
    const res = await invoiceService.getListInvoice();
    setInvoices(res);
    setOriginalInvoices(res);
    setIsLoading(false);
  };
  useEffect(() => {
    document.title = `Danh sách hóa đơn bán hàng - ${APP_NAME}`;
    getListInvoice();
  }, []);
  return (
    <div className="product-page">
      <div className="table-headding">
        <h1>Danh sách hóa đơn bán hàng</h1>
        <Button
          type="default"
          color="default"
          className="btn-add"
          size="large"
          onClick={() => navigate(ROUTE_URL.INVOICE + `/create`)}
          icon={<PlusOutlined />}
        >
          Tạo hóa đơn
        </Button>
      </div>

      <CommonSearch
        originalData={originalInvoices}
        data={invoices}
        setData={setInvoices}
        onRefresh={getListInvoice}
      />
      <CommonTable
        originalData={originalInvoices}
        data={invoices}
        setData={setInvoices}
        isLoading={isLoading}
        columns={columns}
      />
    </div>
  );
};
export default InvoicePage;
