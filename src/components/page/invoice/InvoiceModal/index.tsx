import { Col, Modal, Row, Table, TableProps } from "antd";
import { IInvoice, IProductInvoice } from "constant/interface";
import { FC, memo } from "react";
import logo from "resources/image/winmart-logo.png";
import dayjs from "dayjs";
import NumberFormat from "components/NumberFormat";
import Barcode from "react-barcode";

const InvoiceModal: FC<{ open: boolean; setOpen: any; invoice: IInvoice }> = ({
  open,
  setOpen,
  invoice,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const columns: TableProps<IProductInvoice>["columns"] = [
    {
      title: "Mặt hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      width: "80px",
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
    <Modal
      className="app-modal invoice-modal"
      open={open}
      onCancel={handleClose}
      footer={null}
      destroyOnClose
      width={400}
      maskClosable={false}
    >
      <div className="title">
        <img src={logo} alt="" />
      </div>
      <h2>Hóa đơn bán hàng</h2>
      <div className="invoice-info">
        <Row>
          <Col span={16}>
            <div className="invoice-info-item">
              <b>Ngày bán: </b>
              <span>
                {dayjs(invoice.createdDate).format("DD/MM/YYYY HH:mm")}
              </span>
            </div>
            <div className="invoice-info-item">
              <b>HĐ: </b>
              <span>{invoice.id}</span>
            </div>
          </Col>
          <Col span={8}>
            <div className="invoice-info-item">
              <b>NVBH: </b>
              <span>{invoice.staffId}</span>
            </div>
          </Col>
        </Row>
      </div>
      <div className="product-table">
        <Table
          columns={columns}
          dataSource={invoice.products}
          className="invoice-table"
          pagination={false}
        />
      </div>
      <div className="invoice-total">
        <div className="invoice-total-item">
          <b>Tổng giá trị hóa đơn</b>
          <p>
            <NumberFormat value={invoice.total} />
          </p>
        </div>
        <div className="invoice-total-item">
          <b>Tổng tiền đã giảm</b>
          <p>
            <NumberFormat value={-invoice.reducedAmount * 1000} />
          </p>
        </div>
        <div className="invoice-total-item">
          <b>Tổng tiền thanh toán</b>
          <p>
            <NumberFormat
              value={invoice.total - invoice.reducedAmount * 1000}
            />
          </p>
        </div>
      </div>
      <div className="invoice-member border-dash-bottom">
        <div className="invoice-member-item">
          <p>Hội viên:</p>
          <p>{invoice.memberId || "--"}</p>
        </div>
        <div className="invoice-member-item">
          <p>Số tham chiếu:</p>
          <p>{invoice.id}</p>
        </div>
      </div>
      <div
        className="border-dash-bottom"
        style={{ marginTop: 10, textAlign: "center" }}
      >
        <p>Chỉ xuất hóa đơn trong ngày</p>
        <p>Tax Invoice will be issued within same day</p>
      </div>
      <div style={{ marginTop: 10, textAlign: "center" }}>
        <p>CẢM ƠN QUÝ KHÁCH VÀ HẸN GẶP LẠI</p>
        <Barcode value={invoice.id + ""} displayValue={false} />
      </div>
    </Modal>
  );
};

export default memo(InvoiceModal);
