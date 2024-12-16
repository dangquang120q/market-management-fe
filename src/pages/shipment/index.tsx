import { InboxOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, TableProps, Tooltip } from "antd";
import { CommonSearch, CommonTable } from "components/common";
import ShipmentModal from "components/Modal/Shipment";
import NumberFormat from "components/NumberFormat";
import { APP_NAME } from "constant";
import { initProductReceipt } from "constant/initial";
import { IProductReceipt } from "constant/interface";
import { ModalType } from "constant/type";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { productService } from "services/product";

const ProductShipment: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const { extraData } = location.state || {};
  const navigate = useNavigate();

  const [data, setData] = useState<Array<IProductReceipt>>([]);
  const [originalData, setOriginalData] = useState<Array<IProductReceipt>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<ModalType<IProductReceipt>>({
    type: "",
    item: initProductReceipt,
  });

  const fetchData = async () => {
    if (id) {
      setIsLoading(true);
      try {
        const res = await productService.getListShipment({ productId: +id });
        setData(res.data.data);
        setOriginalData(res.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };
  useEffect(() => {
    document.title = `${
      extraData && extraData?.name
        ? `Quản lý lô hàng - ${extraData?.name}`
        : "Quản lý lô hàng"
    } - ${APP_NAME}`;
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
        <Tooltip placement="top" title="Xuất kho">
          <Button
            type="link"
            size="small"
            icon={<InboxOutlined />}
            onClick={() => {
              setOpen({
                item: record,
                type: "edit",
              });
            }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="product-shipment">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip placement="top" title="Quay về">
          <Button
            type="link"
            size="large"
            icon={<LeftOutlined />}
            onClick={() => {
              navigate(ROUTE_URL.PRODUCT);
            }}
          />
        </Tooltip>

        <h1>
          {extraData && extraData?.name
            ? `Quản lý lô hàng - ${extraData?.name}`
            : "Quản lý lô hàng"}
        </h1>
      </div>

      <CommonSearch
        originalData={originalData}
        data={data}
        setData={setData}
        onRefresh={fetchData}
      />
      <CommonTable
        originalData={originalData}
        data={data}
        setData={setData}
        isLoading={isLoading}
        columns={columns}
      />
      <ShipmentModal open={open} setOpen={setOpen} fetchData={fetchData} />
    </div>
  );
};

export default ProductShipment;
