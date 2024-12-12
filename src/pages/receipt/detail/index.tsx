import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Table, TableProps } from "antd";
import NumberFormat from "components/NumberFormat";
import { initReceipt } from "constant/initial";
import { IProductReceipt, IReceiptDetail } from "constant/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { receiptService } from "services/receipt";

const ReceiptDetail: FC = () => {
  const { id } = useParams();
  const [receipt, setReceipt] = useState<IReceiptDetail>(initReceipt);
  const fetchData = async () => {
    if (id) {
      const res = await receiptService.getReceiptById({ id });
      console.log(res);
      setReceipt(res);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  const columns: TableProps<IProductReceipt>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render(_value, _record, index) {
        return index + 1;
      },
    },
    {
      title: "Mặt hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn giá",
      dataIndex: "importPrice",
      key: "importPrice",
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "T.Tiền",
      dataIndex: "total",
      key: "total",
      render: (_val: any, rec: any) => rec.importPrice * rec.qty,
    },
    {
      title: "NSX",
      dataIndex: "mfgDate",
      key: "mfgDate",
    },
    {
      title: "HSD",
      dataIndex: "expDate",
      key: "expDate",
    },
  ];
  return (
    <div className="invoice-detail">
      <Space>
        <Link to={ROUTE_URL.RECEIPT}>
          <Button type="link">
            <ArrowLeftOutlined />
          </Button>
        </Link>
        <h1>Chi tiết hóa đơn</h1>
      </Space>
      <Divider />
      <div className="invoice-info">
        <Row>
          <Col span={24}>
            <div className="invoice-info-item">
              <b>Ngày lập:</b>
              <span>
                {dayjs(receipt.createdDate).format("DD/MM/YYYY HH:mm")}
              </span>
            </div>
          </Col>
          <Col span={14}>
            <div className="invoice-info-item">
              <b>Người lập phiếu:</b>
              <span>{receipt.staff.name}</span>
            </div>
          </Col>
          <Col span={10}>
            <div className="invoice-info-item">
              <b>Mã NV:</b>
              <span>{receipt.staffId}</span>
            </div>
          </Col>
          <Col span={14}>
            <div className="invoice-info-item">
              <b>Nhà cung cấp:</b>
              <span>{receipt.supplier.name}</span>
            </div>
          </Col>
          <Col span={10}>
            <div className="invoice-info-item">
              <b>SĐT:</b>
              <span>{receipt.supplier.phone}</span>
            </div>
          </Col>

          <Col span={24}>
            <div className="invoice-info-item">
              <b>Địa chỉ:</b>
              <span>{receipt.supplier.address}</span>
            </div>
          </Col>
        </Row>
      </div>
      <h3>Danh sách mặt hàng</h3>
      <Table
        dataSource={receipt.products}
        columns={columns}
        pagination={false}
      />
      <div className="invoice-total-item">
        <b>Tổng tiền:</b>
        <span>
          <NumberFormat value={receipt.total} /> đồng
        </span>
      </div>
      <div className="invoice-info-item ">
        <b>Ghi chú:</b>
        <span>{}</span>
      </div>
    </div>
  );
};
export default ReceiptDetail;
