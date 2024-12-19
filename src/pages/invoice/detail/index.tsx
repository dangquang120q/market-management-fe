import { LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Row,
  Space,
  Table,
  TableProps,
  Card,
  Tooltip,
  Skeleton,
} from "antd";
import NumberFormat from "components/NumberFormat";
import { APP_NAME } from "constant";
import { initInvoice } from "constant/initial";
import { IInvoiceDetail, IProductInvoice } from "constant/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { invoiceService } from "services/invoice";

const InvoiceDetail: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoices] = useState<IInvoiceDetail>(initInvoice);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    if (id) {
      setLoading(true);
      const res = await invoiceService.getInvoiceById({ id });
      console.log(res);
      setInvoices(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `Chi tiết hóa đơn - ${APP_NAME}`;
    fetchData();
  }, [id]);

  const columns: TableProps<IProductInvoice>["columns"] = [
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
      dataIndex: "price",
      key: "price",
      render: (_value, rec) => (
        <p>
          <NumberFormat value={rec.price} /> đ
        </p>
      ),
    },
    {
      title: "SL",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "T.Tiền",
      dataIndex: "total",
      key: "total",
      render: (_value, rec) => (
        <p>
          <NumberFormat value={rec.price * rec.qty} /> đ
        </p>
      ),
    },
  ];

  return (
    <div className="invoice-detail">
      <Space>
        <Tooltip placement="top" title="Quay về">
          <Button
            type="link"
            size="large"
            icon={<LeftOutlined />}
            onClick={() => {
              navigate(ROUTE_URL.INVOICE);
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
                <b>Ngày bán: </b>
                <span>
                  {dayjs(invoice.createdDate).format("DD/MM/YYYY HH:mm")}
                </span>
              </div>
              <div className="invoice-info-item">
                <b>Mã NVBH: </b>
                <span>{invoice.staffId}</span>
              </div>
              <div className="invoice-info-item">
                <b>Mã HV: </b>
                <span>{invoice.memberId}</span>
              </div>
            </Col>
            <Col span={12}>
              <div className="invoice-info-item">
                <b>Mã HĐ: </b>
                <span>{invoice.id}</span>
              </div>
              <div className="invoice-info-item">
                <b>Nhân viên bán hàng: </b>
                <span>{invoice.staff.name}</span>
              </div>
              <div className="invoice-info-item">
                <b>Tên hội viên: </b>
                <span>{invoice.member?.name}</span>
              </div>
            </Col>
          </Row>
        </Skeleton>
      </Card>
      <Divider />
      <Card title="Danh sách sản phẩm" bordered={false}>
        <Table
          columns={columns}
          loading={loading}
          dataSource={invoice?.products}
          className="invoice-table"
          pagination={false}
        />
      </Card>
      <Divider />
      <Card title="Tổng kết" bordered={false}>
        <Skeleton loading={loading} active>
          <div className="invoice-total-item">
            <b>Tổng giá trị hóa đơn:</b>
            <p>
              <NumberFormat value={invoice?.total} />  đ
            </p>
          </div>
          <div className="invoice-total-item">
            <b>Tổng tiền đã giảm:</b>
            <p>
              <NumberFormat value={-invoice?.reducedAmount * 1000} />  đ
            </p>
          </div>
          <div className="invoice-total-item">
            <b>Tổng tiền thanh toán:</b>
            <p>
              <NumberFormat value={invoice.total - invoice.reducedAmount * 1000} />  đ
            </p>
          </div>
        </Skeleton>
      </Card>
    </div>
  );
};
export default InvoiceDetail;
