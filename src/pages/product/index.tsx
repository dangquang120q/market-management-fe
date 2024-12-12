import {
  BarsOutlined,
  DeleteOutlined,
  EditOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Button, Space, TableProps } from "antd";
import ProductModal from "components/Modal/Product";
import TableSearch from "components/TableSearch";
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
  const [categories, setCategories] = useState<Array<ICategory>>([]);
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
    const res = await productService.getListProduct();
    setProducts(res);
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
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: IProduct) => {
        return (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => {
                navigate(ROUTE_URL.PRODUCT + `/shipment/${value}`);
              }}
            >
              <BarsOutlined />
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                handleOpenModal("edit", rec);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              type="link"
              size="small"
              danger
              onClick={() => {
                handleDeleteProduct(value);
              }}
            >
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    (async () => {
      const res = await categoryService.getListCategory();
      setCategories(res);
      getListProduct();
    })();
  }, []);
  return (
    <div className="product-page">
      <h1 style={{ marginBottom: 20 }}>Quản lý mặt hàng</h1>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          handleOpenModal("create", initProduct);
        }}
      >
        Tạo mặt hàng
      </Button>
      <Button type="link" onClick={getListProduct}>
        <RedoOutlined />
      </Button>
      <TableSearch columns={columns} data={products} />
      <ProductModal open={open} setOpen={setOpen} categories={categories} />
    </div>
  );
};
export default Product;
