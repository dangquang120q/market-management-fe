import { BarsOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space, TableProps, Tooltip } from "antd";
import { CommonSearch, CommonTable } from "components/common";
import NumberFormat from "components/NumberFormat";
import { APP_NAME } from "constant";
import { IReceipt, ISupplier } from "constant/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { receiptService } from "services/receipt";
import { supplierService } from "services/supplier";

const ReceiptPage: FC = () => {
  const [receipts, setReceipts] = useState<Array<IReceipt>>([]);
  const [originalReceipts, setOriginalReceipts] = useState<Array<IReceipt>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (value: string | number) => {
        return (
          <Space>
            <Tooltip placement="top" title="Chi tiết">
              <Button
                type="link"
                size="small"
                icon={<BarsOutlined />}
                onClick={() => {
                  navigate(ROUTE_URL.RECEIPT + `/detail/${value}`);
                }}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  const getListReceipt = async () => {
    setIsLoading(true);
    const res = await receiptService.getListReceipt();
    setReceipts(res);
    setOriginalReceipts(res);
    setIsLoading(false);
  };
  const getListSuppliers = async () => {
    const res = await supplierService.getListSupplier();
    setSuppliers(res);
  };

  useEffect(() => {
    document.title = `Danh sách hóa đơn nhập hàng - ${APP_NAME}`;
    getListSuppliers();
    getListReceipt();
  }, []);
  return (
    <div className="product-page">
      <div className="table-headding">
        <h1>Danh sách hóa đơn nhập hàng</h1>
        <Button
          type="default"
          color="default"
          className="btn-add"
          size="large"
          onClick={() => navigate(ROUTE_URL.RECEIPT + `/create`)}
          icon={<PlusOutlined />}
        >
          Tạo hóa đơn
        </Button>
      </div>

      <CommonSearch
        originalData={originalReceipts}
        data={receipts}
        setData={setReceipts}
        onRefresh={getListReceipt}
      />
      <CommonTable
        originalData={originalReceipts}
        data={receipts}
        setData={setReceipts}
        isLoading={isLoading}
        columns={columns}
      />
    </div>
  );
};
export default ReceiptPage;
