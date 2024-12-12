import { RedoOutlined } from "@ant-design/icons";
import { Button, Space, TableProps } from "antd";
import SupplierModal from "components/Modal/Supplier";
import TableSearch from "components/TableSearch";
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
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: ISupplier) => {
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
                handleDeleteSupplier(value);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  const getListSuppliers = async () => {
    const res = await supplierService.getListSupplier();
    setSuppliers(res);
  };
  useEffect(() => {
    getListSuppliers();
  }, []);
  return (
    <div className="product-page">
      <h1 style={{ marginBottom: 20 }}>Quản lý nhà cung cấp</h1>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          handleOpenModal("create", initSupplier);
        }}
      >
        Tạo nhà cung cấp
      </Button>
      <Button type="link" onClick={getListSuppliers}>
        <RedoOutlined />
      </Button>
      <TableSearch columns={columns} data={suppliers} />
      <SupplierModal open={open} setOpen={setOpen} />
    </div>
  );
};
export default Supplier;
