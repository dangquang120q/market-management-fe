import { RedoOutlined } from "@ant-design/icons";
import { Button, Space, TableProps } from "antd";
import CategoryModal from "components/Modal/Category";
import TableSearch from "components/TableSearch";
import { initProduct } from "constant/initial";
import { ICategory } from "constant/interface";
import { ModalType, ModalTypeType } from "constant/type";
import { FC, useEffect, useState } from "react";
import { categoryService } from "services/category";

const Category: FC = () => {
  const [open, setOpen] = useState<ModalType<ICategory>>({
    type: "",
    item: initProduct,
  });
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const handleOpenModal = (status: ModalTypeType, item: ICategory) => {
    setOpen({
      type: status,
      item,
    });
  };
  const handleDeleteCategory = async (id: string | number) => {
    await categoryService.deleteCategory({ id });
    await getListCategory();
  };
  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên loại hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: ICategory) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                handleOpenModal("edit", rec);
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                handleDeleteCategory(value);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  const getListCategory = async () => {
    const res = await categoryService.getListCategory();
    setCategories(res);
  };
  useEffect(() => {
    getListCategory();
  }, []);
  return (
    <div className="product-page">
      <h1 style={{ marginBottom: 20 }}>Quản lý loại hàng</h1>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          handleOpenModal("create", initProduct);
        }}
      >
        Tạo loại hàng
      </Button>
      <Button type="link" onClick={getListCategory}>
        <RedoOutlined />
      </Button>
      <TableSearch columns={columns} data={categories} />
      <CategoryModal open={open} setOpen={setOpen} />
    </div>
  );
};
export default Category;
