import { Col, Modal, Row, Table, TableProps } from "antd";
import NumberFormat from "components/NumberFormat";
import { initSupplier } from "constant/initial";
import { IProductReceipt, IReceipt, ISupplier } from "constant/interface";
import { FC, memo, useEffect, useState } from "react";
import { supplierService } from "services/supplier";
import { userStore } from "store/user";

const ReceiptModal: FC<{ open: boolean; setOpen: any; receipt: IReceipt }> = ({
  open,
  setOpen,
  receipt,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const { name, id } = userStore();
  const [supplier, setSupplier] = useState<ISupplier>(initSupplier);
  const columns: TableProps<IProductReceipt>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_val, _rec, id) => id + 1,
    },
    {
      title: "Mã MH",
      dataIndex: "id",
      key: "id",
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
      width: "100px",
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
      render: (_val: any, rec: any) => (
        <NumberFormat value={rec.price * rec.qty} />
      ),
    },
  ];
  const getListSuppliers = async () => {
    const res = await supplierService.getListSupplier();
    return res;
  };
  useEffect(() => {
    const getSupplier = async () => {
      const suppliers = await getListSuppliers();
      const res =
        suppliers.find((item: ISupplier) => item.id == receipt.supplierId) ||
        initSupplier;
      setSupplier(res);
    };
    getSupplier();
  }, [receipt.supplierId]);

  return (
    <Modal
      className="app-modal receipt-modal"
      open={open}
      onCancel={handleClose}
      footer={null}
      destroyOnClose
      width={800}
      maskClosable={false}
    >
      <h2 className="title">Hóa đơn nhập hàng</h2>
      <div className="receipt-info">
        <Row>
          <Col span={24}>
            <div className="receipt-info-item">
              <b>Ngày lập:</b>
              <p>{receipt.createdDate}</p>
            </div>
          </Col>
          <Col span={14}>
            <div className="receipt-info-item">
              <b>Người lập phiếu:</b>
              <p>{name}</p>
            </div>
          </Col>
          <Col span={10}>
            <div className="receipt-info-item">
              <b>Mã NV:</b>
              <p>{id}</p>
            </div>
          </Col>
          <Col span={14}>
            <div className="receipt-info-item">
              <b>Nhà cung cấp:</b>
              <p>{supplier.name}</p>
            </div>
          </Col>
          <Col span={10}>
            <div className="receipt-info-item">
              <b>SĐT:</b>
              <p>{supplier.phone}</p>
            </div>
          </Col>

          <Col span={24}>
            <div className="receipt-info-item">
              <b>Địa chỉ:</b>
              <p>{supplier.address}</p>
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
      <div className="receipt-info-item total">
        <b>Tổng tiền:</b>
        <h2>
          <NumberFormat value={receipt.total} /> đồng
        </h2>
      </div>
      <div className="receipt-info-item ">
        <b>Ghi chú:</b>
        <p>{receipt.descripiton}</p>
      </div>
    </Modal>
  );
};

export default memo(ReceiptModal);
