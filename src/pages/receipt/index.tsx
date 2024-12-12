import { Button, Divider, Space, TableProps } from "antd";
import NumberFormat from "components/NumberFormat";
import TableSearch from "components/TableSearch";
import { IReceipt, ISupplier } from "constant/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { receiptService } from "services/receipt";
import { supplierService } from "services/supplier";

const ReceiptPage: FC = () => {
  const [receipts, setReceipt] = useState<Array<IReceipt>>([]);
  const [suppliers, setSuppliers] = useState<Array<ISupplier>>([]);
  const navigate = useNavigate();
  const columns: TableProps<IReceipt>["columns"] = [
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
      title: "Nhà cung cấp",
      dataIndex: "supplierId",
      key: "supplierId",
      render: (value) => {
        const res = suppliers.find((item) => item.id == value);
        return res?.name;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (value) => (
        <p>
          <NumberFormat value={value} /> đ
        </p>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value: string | number) => {
        return (
          <Space>
            <Button
              type="link"
              onClick={() => {
                navigate(ROUTE_URL.RECEIPT + `/detail/${value}`);
              }}
            >
              Detail
            </Button>
          </Space>
        );
      },
    },
  ];
  const getListReceipt = async () => {
    const res = await receiptService.getListReceipt();
    setReceipt(res);
  };
  const getListSuppliers = async () => {
    const res = await supplierService.getListSupplier();
    setSuppliers(res);
  };

  useEffect(() => {
    getListSuppliers();
    getListReceipt();
  }, []);
  return (
    <div className="product-page">
      <h1 style={{ marginBottom: 20 }}>Danh sách hóa đơn nhập hàng</h1>
      <Divider />
      <TableSearch columns={columns} data={receipts} />
    </div>
  );
};
export default ReceiptPage;
