import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Table, TableProps } from "antd";
import NumberFormat from "components/NumberFormat";
import { initInvoice } from "constant/initial";
import { IInvoiceDetail, IProductInvoice } from "constant/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { invoiceService } from "services/invoice";

const InvoiceDetail: FC = () => {
  const { id } = useParams();
  const [invoice, setInvoices] = useState<IInvoiceDetail>(initInvoice);
  const fetchData = async () => {
    if (id) {
      const res = await invoiceService.getInvoiceById({ id });
      console.log(res);
      setInvoices(res);
    }
  };
  useEffect(() => {
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
      render: (_val: any, rec: any) => rec.price * rec.qty,
    },
  ];
  return (
    <div className="invoice-detail">
      <Space>
        <Link to={ROUTE_URL.INVOICE}>
          <Button type="link">
            <ArrowLeftOutlined />
          </Button>
        </Link>
        <h1>Chi tiết hóa đơn</h1>
      </Space>
      <Divider />
      <div className="invoice-info">
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
      </div>
      <div className="product-table">
        <Table
          columns={columns}
          dataSource={invoice?.products}
          className="invoice-table"
          pagination={false}
        />
      </div>
      <div className="invoice-total">
        <div className="invoice-total-item">
          <b>Tổng giá trị hóa đơn:</b>
          <p>
            <NumberFormat value={invoice?.total} />
          </p>
        </div>
        <div className="invoice-total-item">
          <b>Tổng tiền đã giảm:</b>
          <p>
            <NumberFormat value={-invoice?.reducedAmount * 1000} />
          </p>
        </div>
        <div className="invoice-total-item">
          <b>Tổng tiền thanh toán:</b>
          <p>
            <NumberFormat
              value={invoice.total - invoice.reducedAmount * 1000}
            />
          </p>
        </div>
      </div>
    </div>
  );
};
export default InvoiceDetail;
