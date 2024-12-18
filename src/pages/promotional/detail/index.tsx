import { DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, TableProps, Tooltip } from "antd";
import { CommonSearch, CommonTable } from "components/common";
import PromoProductModal from "components/Modal/PromotionalProduct";
import NumberFormat from "components/NumberFormat";
import { APP_NAME } from "constant";
import { initPromoProduct, initPromotional } from "constant/initial";
import { IPromoProduct, IPromotional } from "constant/interface";
import { ModalType, ModalTypeType } from "constant/type";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const [originalPromoProducts, setOriginalPromoProducts] = useState<{
    list: Array<IPromoProduct>;
    promotional: IPromotional;
  }>({
    list: [],
    promotional: initPromotional,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    setIsLoading(true);
    const res = await promotionalService.getListProductPromotional({
      id: id ? +id : "",
    });
    setPromoProducts(res);
    setOriginalPromoProducts(res);
    setIsLoading(false);
  };
  const handleOpenModal = (status: ModalTypeType, item: IPromoProduct) => {
    setOpen({
      type: status,
      item,
    });
  };

  const handleSetPromoProducts= (data: Array<IPromoProduct>) => {
    setPromoProducts(pre => ({...pre, list: data}))
  }
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
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: IPromoProduct) => {
        return (
          <Space>
            <Tooltip placement="top" title="Sửa">
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                onClick={() => {
                  handleOpenModal("edit", rec);
                }}
              />
            </Tooltip>

            <Tooltip placement="top" title="Xóa">
              <Popconfirm
                title={`Xóa ${rec.name}`}
                description="Bạn có chắc chắn muốn xóa !"
                onConfirm={() => handleDeletePromotional(value)}
                okText="Có"
                cancelText="Không"
              >
                <Button
                  icon={<DeleteOutlined />}
                  type="link"
                  size="small"
                  danger
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    document.title = `Chương trình khuyến mãi - ${APP_NAME}`;
    if (id) fetchData();
  }, [id]);
  return (
    <div className="promotional-detail">
      <div className="table-headding">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip placement="top" title="Quay về">
          <Button
            type="link"
            size="large"
            icon={<LeftOutlined />}
            onClick={() => {
              navigate(ROUTE_URL.PROMOTIONAL);
            }}
          />
        </Tooltip>

        <h1>
        Chương trình khuyến mãi
        </h1>
      </div>
      <Button
          type="default"
          color="default"
          className="btn-add"
          size="large"
          onClick={() => handleOpenModal("create", initPromoProduct)}
          icon={<PlusOutlined />}
        >
          Tạo sản phẩm
        </Button>
      </div>
      <CommonSearch
        originalData={originalPromoProducts.list}
        data={promoProducts.list}
        setData={handleSetPromoProducts}
        onRefresh={fetchData}
      />
      <div style={{ paddingBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <h2>
          {promoProducts.promotional.name}
        </h2>
        <p>
          Thời gian: {promoProducts.promotional.startDate} - {" "}
          {promoProducts.promotional.endDate}
        </p>
      </div>
      <CommonTable
        originalData={originalPromoProducts.list}
        data={promoProducts.list}
        setData={handleSetPromoProducts}
        isLoading={isLoading}
        columns={columns}
      />
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
