import { RedoOutlined } from "@ant-design/icons";
import { Button, Divider, Space, TableProps } from "antd";
import MemberModal from "components/Modal/Member";
import TableSearch from "components/TableSearch";
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
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value: string, rec: IMember) => {
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
                handleDeleteMember(value);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  const getListMember = async () => {
    const res = await memberService.getListMember();
    setMembers(res);
  };
  useEffect(() => {
    getListMember();
  }, []);

  return (
    <div className="product-page">
      <h1 style={{ marginBottom: 20 }}>Quản lý hội viên</h1>
      <Divider />
      <Button
        type="primary"
        size="large"
        onClick={() => {
          handleOpenModal("create", initMember);
        }}
      >
        Tạo hội viên
      </Button>
      <Button type="link" onClick={getListMember}>
        <RedoOutlined />
      </Button>
      <TableSearch columns={columns} data={members} />
      <MemberModal open={open} setOpen={setOpen} />
    </div>
  );
};
export default MemberPage;
