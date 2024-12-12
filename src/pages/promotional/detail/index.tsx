import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Space, TableProps } from "antd";
import PromoProductModal from "components/Modal/PromotionalProduct";
import NumberFormat from "components/NumberFormat";
import TableSearch from "components/TableSearch";
import { initPromoProduct, initPromotional } from "constant/initial";
import { IPromoProduct, IPromotional } from "constant/interface";
import { ModalType, ModalTypeType } from "constant/type";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { promotionalService } from "services/promotional";

const PromotionalDetail: FC = () => {
  const [open, setOpen] = useState<ModalType<IPromoProduct>>({
    type: "",
    item: initPromoProduct,
  });
  const [promoProducts, setPromoProducts] = useState<{
    list: Array<IPromoProduct>;
    promotional: IPromotional;
  }>({
    list: [],
    promotional: initPromotional,
  });
  const { id } = useParams();
  const fetchData = async () => {
    const res = await promotionalService.getListProductPromotional({
      id: id ? +id : "",
    });
    setPromoProducts(res);
  };
  const handleOpenModal = (status: ModalTypeType, item: IPromoProduct) => {
    setOpen({
      type: status,
      item,
    });
  };
  const handleDeletePromotional = async (id: string | number) => {
    await promotionalService.deleteProductPromotional({ id });
    await fetchData();
  };
  const columns: TableProps<IPromoProduct>["columns"] = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
      render(_value, _record, index) {
        return index + 1;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (val) => <NumberFormat value={val} />,
    },
    {
      title: "Giá đã giảm",
      dataIndex: "promoPrice",
      key: "promoPrice",
      render: (val) => (
        <b>
          <NumberFormat value={val} />
        </b>
      ),
    },
    {
      title: "Tổng số lượng",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Số lượng bán",
      dataIndex: "saleTotal",
      key: "saleTotal",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: IPromoProduct) => {
        return (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => {
                handleOpenModal("edit", rec);
              }}
            >
              <EditFilled />
            </Button>
            <Button
              type="link"
              size="small"
              danger
              onClick={() => {
                handleDeletePromotional(value);
              }}
            >
              <DeleteFilled />
            </Button>
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    if (id) fetchData();
  }, [id]);
  return (
    <div className="promotional-detail">
      <Link to={ROUTE_URL.PROMOTIONAL}>
        <h1 style={{ cursor: "pointer" }}>
          <ArrowLeftOutlined /> Chương trình khuyến mãi
        </h1>
      </Link>
      <div style={{ margin: "10px 0" }}>
        <h2 style={{ marginBottom: "10px" }}>
          {promoProducts.promotional.name}
        </h2>
        <p>
          Thời gian: {promoProducts.promotional.startDate} -{" "}
          {promoProducts.promotional.endDate}
        </p>
      </div>
      <Button
        type="primary"
        onClick={() => {
          handleOpenModal("create", initPromoProduct);
        }}
      >
        Thêm sản phẩm
      </Button>
      <TableSearch columns={columns} data={promoProducts.list} />
      <PromoProductModal
        open={open}
        setOpen={setOpen}
        fetchData={fetchData}
        promotionalId={promoProducts.promotional.id}
      />
    </div>
  );
};

export default PromotionalDetail;
