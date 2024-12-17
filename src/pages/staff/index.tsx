import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space, TableProps, Tooltip } from "antd";
import { CommonSearch, CommonTable } from "components/common";
import StaffModal from "components/Modal/Staff";
import { APP_NAME, ROLE } from "constant";
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
  const [originalStaffs, setOriginalStaffs] = useState<Array<IStaff>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
                onConfirm={() => handleDeleteStaff(value)}
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
  const getListStaff = async () => {
    setIsLoading(true);
    const res = await userService.getListStaff();
    setStaff(res);
    setOriginalStaffs(res);
    setIsLoading(false);
  };
  useEffect(() => {
    document.title = `Quản lý nhân viên - ${APP_NAME}`;
    getListStaff();
  }, []);
  return (
    <div className="product-page">
      <div className="table-headding">
        <h1>Quản lý nhân viên</h1>
        <Button
          type="default"
          color="default"
          className="btn-add"
          size="large"
          onClick={() => handleOpenModal("create", initStaff)}
          icon={<PlusOutlined />}
        >
          Tạo nhân viên
        </Button>
      </div>

      <CommonSearch
        originalData={originalStaffs}
        data={staffs}
        setData={setStaff}
        onRefresh={getListStaff}
      />
      <CommonTable
        originalData={originalStaffs}
        data={staffs}
        setData={setStaff}
        isLoading={isLoading}
        columns={columns}
      />
      <StaffModal open={open} setOpen={setOpen} />
    </div>
  );
};
export default Staff;
