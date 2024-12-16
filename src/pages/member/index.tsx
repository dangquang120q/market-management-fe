import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, TableProps, Tooltip } from "antd";
import { CommonSearch, CommonTable } from "components/common";
import MemberModal from "components/Modal/Member";
import { APP_NAME } from "constant";
import { initMember } from "constant/initial";
import { IMember } from "constant/interface";
import { ModalType, ModalTypeType } from "constant/type";
import { FC, useEffect, useState } from "react";
import { memberService } from "services/member";

const MemberPage: FC = () => {
  const [open, setOpen] = useState<ModalType<IMember>>({
    type: "",
    item: initMember,
  });
  const [members, setMembers] = useState<Array<IMember>>([]);
  const [originalMembers, setOriginalMembers] = useState<Array<IMember>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleOpenModal = (status: ModalTypeType, item: IMember) => {
    setOpen({
      type: status,
      item,
    });
  };
  const handleDeleteMember = async (id: string) => {
    await memberService.deleteMember({ id });
    await getListMember();
  };
  const columns: TableProps<IMember>["columns"] = [
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
      title: "Tên hội viên",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Điểm tích lũy",
      dataIndex: "point",
      key: "point",
      sorter: (a, b) => a.point - b.point,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (val) => <p>{new Date(val).toLocaleString()}</p>,
      sorter: (a, b) =>
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
    },

    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (value: string, rec: IMember) => {
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
                onConfirm={() => handleDeleteMember(value)}
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
  const getListMember = async () => {
    setIsLoading(true);
    const res = await memberService.getListMember();
    setMembers(res);
    setOriginalMembers(res);
    setIsLoading(false);
  };
  useEffect(() => {
    document.title = `Quản lý hội viên - ${APP_NAME}`;
    getListMember();
  }, []);

  return (
    <div className="product-page">
      <div className="table-headding">
        <h1>Quản lý hội viên</h1>
        <Button
          type="default"
          color="default"
          className="btn-add"
          size="large"
          onClick={() => handleOpenModal("create", initMember)}
          icon={<PlusOutlined />}
        >
          Tạo hội viên
        </Button>
      </div>
      <CommonSearch
        originalData={originalMembers}
        data={members}
        setData={setMembers}
        onRefresh={getListMember}
      />
      <CommonTable
        originalData={originalMembers}
        data={members}
        setData={setMembers}
        isLoading={isLoading}
        columns={columns}
      />
      <MemberModal open={open} setOpen={setOpen} />
    </div>
  );
};
export default MemberPage;
