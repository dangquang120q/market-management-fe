import { RedoOutlined } from "@ant-design/icons";
import { Button, Space, TableProps } from "antd";
import StaffModal from "components/Modal/Staff";
import TableSearch from "components/TableSearch";
import { ROLE } from "constant";
import { initStaff } from "constant/initial";
import { IStaff } from "constant/interface";
import { ModalType, ModalTypeType, RoleType } from "constant/type";
import { FC, useEffect, useState } from "react";
import { userService } from "services/user";

const Staff: FC = () => {
  const [open, setOpen] = useState<ModalType<IStaff>>({
    type: "",
    item: initStaff,
  });
  const [staffs, setStaff] = useState<Array<IStaff>>([]);
  const handleOpenModal = (status: ModalTypeType, item: IStaff) => {
    setOpen({
      type: status,
      item,
    });
  };
  const handleDeleteStaff = async (id: string | number) => {
    await userService.deleteStaff({ id });
    await getListStaff();
  };
  const columns: TableProps<IStaff>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_val, _rec, index) => index + 1,
    },
    {
      title: "Mã NV",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (val: RoleType) => ROLE[val],
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: IStaff) => {
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
                handleDeleteStaff(value);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  const getListStaff = async () => {
    const res = await userService.getListStaff();
    setStaff(res);
  };
  useEffect(() => {
    getListStaff();
  }, []);
  return (
    <div className="product-page">
      <h1 style={{ marginBottom: 20 }}>Quản lý nhân viên</h1>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          handleOpenModal("create", initStaff);
        }}
      >
        Tạo nhân viên
      </Button>
      <Button type="link" onClick={getListStaff}>
        <RedoOutlined />
      </Button>
      <TableSearch columns={columns} data={staffs} />
      <StaffModal open={open} setOpen={setOpen} />
    </div>
  );
};
export default Staff;
