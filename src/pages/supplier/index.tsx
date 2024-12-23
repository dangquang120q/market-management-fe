import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, TableProps, Tooltip } from "antd";
import { CommonSearch, CommonTable } from "components/common";
import SupplierModal from "components/Modal/Supplier";
import { APP_NAME } from "constant";
import { initSupplier } from "constant/initial";
import { ISupplier } from "constant/interface";
import { ModalType, ModalTypeType } from "constant/type";
import { FC, useEffect, useState } from "react";
import { supplierService } from "services/supplier";

const Supplier: FC = () => {
  const [open, setOpen] = useState<ModalType<ISupplier>>({
    type: "",
    item: initSupplier,
  });
  const [suppliers, setSuppliers] = useState<Array<ISupplier>>([]);
  const [originalSuppliers, setOriginalSuppliers] = useState<Array<ISupplier>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleOpenModal = (status: ModalTypeType, item: ISupplier) => {
    setOpen({
      type: status,
      item,
    });
  };
  const handleDeleteSupplier = async (id: string | number) => {
    await supplierService.deleteSupplier({ id });
    await getListSuppliers();
  };
  const columns: TableProps<ISupplier>["columns"] = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      width: "10%",
      render: (value: string) => (
        <a href={value} target="_blank" rel="noreferecne">
          {value?.split("www.")[1] || value}
        </a>
      ),
    },
    {
      title: "Mã số thuế",
      dataIndex: "tax",
      key: "tax",
    },

    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: ISupplier) => {
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
                onConfirm={() => handleDeleteSupplier(value)}
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
  const getListSuppliers = async () => {
    setIsLoading(true);
    const res = await supplierService.getListSupplier();
    setSuppliers(res);
    setOriginalSuppliers(res);
    setIsLoading(false);
  };
  useEffect(() => {
    document.title = `Quản lý nhà cung cấp - ${APP_NAME}`;
    getListSuppliers();
  }, []);
  return (
    <div className="product-page">
      <div className="table-headding">
        <h1>Quản lý nhà cung cấp</h1>
        <Button
          type="default"
          color="default"
          className="btn-add"
          size="large"
          onClick={() => handleOpenModal("create", initSupplier)}
          icon={<PlusOutlined />}
        >
          Tạo nhà cung cấp
        </Button>
      </div>

      <CommonSearch
        originalData={originalSuppliers}
        data={suppliers}
        setData={setSuppliers}
        onRefresh={getListSuppliers}
      />
      <CommonTable
        originalData={originalSuppliers}
        data={suppliers}
        setData={setSuppliers}
        isLoading={isLoading}
        columns={columns}
      />
      <SupplierModal open={open} setOpen={setOpen} getList={getListSuppliers} />
    </div>
  );
};
export default Supplier;
