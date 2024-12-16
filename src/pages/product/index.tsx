import {
  BarsOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space, TableProps, Tooltip } from "antd";
import { CommonSearch, CommonTable } from "components/common";
import ProductModal from "components/Modal/Product";
import { APP_NAME } from "constant";
import { initProduct } from "constant/initial";
import { ICategory, IProduct } from "constant/interface";
import { ModalType, ModalTypeType } from "constant/type";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { categoryService } from "services/category";
import { productService } from "services/product";

const Product: FC = () => {
  const [open, setOpen] = useState<ModalType<IProduct>>({
    type: "",
    item: initProduct,
  });
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [originalProducts, setOriginalProducts] = useState<Array<IProduct>>([]);
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const handleOpenModal = (status: ModalTypeType, item: IProduct) => {
    setOpen({
      type: status,
      item,
    });
  };
  const handleDeleteProduct = async (id: string | number) => {
    await productService.deleteProduct({ id });
    await getListProduct();
  };
  const getListProduct = async () => {
    setIsLoading(true);
    const res = await productService.getListProduct();
    setOriginalProducts(res);
    setProducts(res);
    setIsLoading(false);
  };
  const columns: TableProps<IProduct>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_value, _record, index) => index + 1,
    },
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên mặt hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Số lượng",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => (a?.total || 0) - (b?.total || 0),
    },
    {
      title: "Số lượng bán",
      dataIndex: "saleTotal",
      key: "saleTotal",
      sorter: (a, b) => (a?.saleTotal || 0) - (b?.saleTotal || 0),
    },
    {
      title: "Loại hàng",
      dataIndex: "categoryId",
      key: "categoryId",
      filters: categories.map((item: ICategory) => ({
        text: item.name,
        value: item.id,
      })),
      onFilter: (value, rec) => rec.categoryId == value,
      render: (value) => categories.find((item) => item.id == value)?.name,
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: IProduct) => {
        return (
          <Space>
            <Tooltip placement="top" title="Lô hàng">
              <Button
                type="link"
                size="small"
                icon={<BarsOutlined />}
                onClick={() => {
                  navigate(ROUTE_URL.PRODUCT + `/shipment/${value}`, {
                    state: { extraData: rec },
                  });
                }}
              />
            </Tooltip>

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
                onConfirm={() => handleDeleteProduct(value)}
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
    document.title = `Quản lý mặt hàng - ${APP_NAME}`;
    (async () => {
      const res = await categoryService.getListCategory();
      setCategories(res);
      getListProduct();
    })();
  }, []);
  return (
    <div className="product-page">
      <div className="table-headding">
        <h1>Quản lý mặt hàng</h1>
        <Button
          type="default"
          color="default"
          className="btn-add"
          size="large"
          onClick={() => handleOpenModal("create", initProduct)}
          icon={<PlusOutlined />}
        >
          Tạo mặt hàng
        </Button>
      </div>

      <CommonSearch
        originalData={originalProducts}
        data={products}
        setData={setProducts}
        onRefresh={getListProduct}
      />
      <CommonTable
        originalData={originalProducts}
        data={products}
        setData={setProducts}
        isLoading={isLoading}
        columns={columns}
      />
      <ProductModal open={open} setOpen={setOpen} categories={categories} />
    </div>
  );
};
export default Product;
