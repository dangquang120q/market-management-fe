import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, TableProps, Tooltip } from "antd";
import { CommonSearch, CommonTable } from "components/common";
import CategoryModal from "components/Modal/Category";
import { APP_NAME } from "constant";
import { initCategory } from "constant/initial";
import { ICategory } from "constant/interface";
import { ModalType, ModalTypeType } from "constant/type";
import { FC, useEffect, useState } from "react";
import { categoryService } from "services/category";

const Category: FC = () => {
  const [open, setOpen] = useState<ModalType<ICategory>>({
    type: "",
    item: initCategory,
  });
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [originalCategories, setOriginalCategories] = useState<Array<ICategory>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
                onConfirm={() => handleDeleteCategory(value)}
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
  const getListCategory = async () => {
    setIsLoading(true);
    const res = await categoryService.getListCategory();
    setCategories(res);
    setOriginalCategories(res);
    setIsLoading(false);
  };
  useEffect(() => {
    document.title = `Quản lý loại hàng - ${APP_NAME}`;
    getListCategory();
  }, []);
  return (
    <div className="product-page">
      <div className="table-headding">
        <h1>Quản lý loại hàng</h1>
        <Button
          type="default"
          color="default"
          className="btn-add"
          size="large"
          onClick={() => handleOpenModal("create", initCategory)}
          icon={<PlusOutlined />}
        >
          Tạo loại hàng
        </Button>
      </div>

      <CommonSearch
        originalData={originalCategories}
        data={categories}
        setData={setCategories}
        onRefresh={getListCategory}
      />
      <CommonTable
        originalData={originalCategories}
        data={categories}
        setData={setCategories}
        isLoading={isLoading}
        columns={columns}
      />
      <CategoryModal open={open} setOpen={setOpen} />
    </div>
  );
};
export default Category;
