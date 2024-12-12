import { LeftOutlined } from "@ant-design/icons";
import { Button, TableProps } from "antd";
import ShipmentModal from "components/Modal/Shipment";
import NumberFormat from "components/NumberFormat";
import TableSearch from "components/TableSearch";
import { initProductReceipt } from "constant/initial";
import { IProductReceipt } from "constant/interface";
import { ModalType } from "constant/type";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { productService } from "services/product";

const ProductShipment: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<Array<IProductReceipt>>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState<ModalType<IProductReceipt>>({
    type: "",
    item: initProductReceipt,
  });
  const fetchData = async () => {
    if (id)
      try {
        const res = await productService.getListShipment({ productId: +id });
        setData(res.data.data);
      } catch (error) {
        console.log(error);
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
      title: "Hóa đơn",
      dataIndex: "receiptId",
      key: "receiptId",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng nhập",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Số lượng còn lại",
      dataIndex: "remain",
      key: "remain",
    },
    {
      title: "T.Tiền",
      dataIndex: "total",
      key: "total",
      render: (_val: any, rec: any) => (
        <NumberFormat value={rec.price * rec.qty} />
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
    {
      title: "Xuất kho",
      dataIndex: "id",
      key: "id",
      render: (_val, record) => (
        <Button
          type="default"
          onClick={() => {
            setOpen({
              item: record,
              type: "edit",
            });
          }}
        >
          Xuất kho
        </Button>
      ),
    },
  ];

  return (
    <div className="product-shipment">
      <h1
        style={{ marginBottom: 20, cursor: "pointer" }}
        onClick={() => {
          navigate(ROUTE_URL.PRODUCT);
        }}
      >
        <LeftOutlined />
        <span>Quản lý lô hàng</span>
      </h1>
      <TableSearch columns={columns} data={data} />
      <ShipmentModal open={open} setOpen={setOpen} fetchData={fetchData} />
    </div>
  );
};

export default ProductShipment;
