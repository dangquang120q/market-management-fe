import {
  DeleteFilled,
  EditFilled,
  RedoOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Space, TableProps } from "antd";
import PromotionalModal from "components/Modal/Promotional";
import TableSearch from "components/TableSearch";
import { initPromotional } from "constant/initial";
import { IPromotional } from "constant/interface";
import { ModalType, ModalTypeType } from "constant/type";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { promotionalService } from "services/promotional";

const Promotional: FC = () => {
  const [open, setOpen] = useState<ModalType<IPromotional>>({
    type: "",
    item: initPromotional,
  });
  const [promotionals, setPromotionals] = useState<Array<IPromotional>>([]);
  const handleOpenModal = (status: ModalTypeType, item: IPromotional) => {
    setOpen({
      type: status,
      item,
    });
  };
  const handleDeletePromotional = async (id: string | number) => {
    await promotionalService.deletePromotional({ id });
    await getListPromotional();
  };
  const columns: TableProps<IPromotional>["columns"] = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
      render(_value, _record, index) {
        return index + 1;
      },
    },
    {
      title: "Tên chương trình",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (val) => dayjs(val, "MM/DD/YYYY").format("DD/MM/YYYY"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (val) => dayjs(val, "MM/DD/YYYY").format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: IPromotional) => {
        return (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => {
                handleOpenModal("edit", rec);
              }}
            >
              <EditFilled />
            </Button>
            <Button
              type="link"
              size="small"
              danger
              onClick={() => {
                handleDeletePromotional(value);
              }}
            >
              <DeleteFilled />
            </Button>
            <Link to={`/promotional/detail/${value}`}>
              <Button type="link" size="small">
                <UnorderedListOutlined />
              </Button>
            </Link>
          </Space>
        );
      },
    },
  ];
  const getListPromotional = async () => {
    const res = await promotionalService.getListPromotional();
    setPromotionals(res);
  };
  useEffect(() => {
    getListPromotional();
  }, []);
  return (
    <div className="product-page">
      <h1 style={{ marginBottom: 20 }}>Quản lý chương trình khuyến mãi</h1>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          handleOpenModal("create", initPromotional);
        }}
      >
        Tạo chương trình
      </Button>
      <Button type="link" onClick={getListPromotional}>
        <RedoOutlined />
      </Button>
      <TableSearch columns={columns} data={promotionals} />
      <PromotionalModal open={open} setOpen={setOpen} />
    </div>
  );
};
export default Promotional;
