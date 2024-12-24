import { LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Skeleton,
  Space,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import NumberFormat from "components/NumberFormat";
import { APP_NAME } from "constant";
import { initReceipt } from "constant/initial";
import { IProductReceipt, IReceiptDetail } from "constant/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { receiptService } from "services/receipt";

const ReceiptDetail: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<IReceiptDetail>(initReceipt);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    if (id) {
      setLoading(true);
      const res = await receiptService.getReceiptById({ id });
      console.log(res);
      setReceipt(res);
      setLoading(false);
    }
  };
  useEffect(() => {
    document.title = `Chi tiết hóa đơn - ${APP_NAME}`;
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
      render: (_value, rec) => (
        <p>
          <NumberFormat value={rec.price} /> đ
        </p>
      ),
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
      render: (_val: any, rec: any) => (
        <p>
          <NumberFormat value={rec.price * rec.qty} /> đ
        </p>
      ),
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
    <div className="receipt-detail">
      <Space>
        <Tooltip placement="top" title="Quay về">
          <Button
            type="link"
            size="large"
            icon={<LeftOutlined />}
            onClick={() => {
              navigate(ROUTE_URL.RECEIPT);
            }}
          />
        </Tooltip>
        <h1>Chi tiết hóa đơn</h1>
      </Space>
      <Divider />
      <Card title="Thông tin hóa đơn" bordered={false}>
        <Skeleton loading={loading} active>
          <Row>
            <Col span={12}>
              <div className="invoice-info-item">
                <b>Ngày lập: </b>
                <span>
                  {dayjs(receipt.createdDate).format("DD/MM/YYYY HH:mm")}
                </span>
              </div>
              <div className="invoice-info-item">
                <b>Người lập phiếu: </b>
                <span>{receipt.staff.name}</span>
              </div>
              <div className="invoice-info-item">
                <b>Mã NV: </b>
                <span>{receipt.staffId}</span>
              </div>
              <div className="invoice-info-item">
                <b>Nhà cung cấp: </b>
                <span>{receipt.supplier.name}</span>
              </div>
              <div className="invoice-info-item">
                <b>Địa chỉ: </b>
                <span>{receipt.supplier.address}</span>
              </div>
            </Col>
            <Col span={12}>
              <div className="invoice-info-item">
                <b>Mã NV: </b>
                <span>{receipt.staffId}</span>
              </div>
              <div className="invoice-info-item">
                <b>SĐT: </b>
                <span>{receipt.supplier.phone}</span>
              </div>
            </Col>
          </Row>
        </Skeleton>
      </Card>
      <Divider />
      <Card title="Danh sách mặt hàng" bordered={false}>
        <Table
          columns={columns}
          loading={loading}
          dataSource={receipt.products}
          pagination={false}
        />
      </Card>
      <Divider />

      <Card title="Tổng kết" bordered={false}>
        <Skeleton loading={loading} active>
          <div className="receipt-total-item" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.1rem" }}>
            <b>Tổng tiền thanh toán:</b>
            <p>
              <NumberFormat value={receipt.total} /> đ
            </p>
          </div>
          <div className="receipt-total-item">
            <b>Ghi chú:</b>
            <p>{}</p>
          </div>
        </Skeleton>
      </Card>
    </div>
  );
};
export default ReceiptDetail;
