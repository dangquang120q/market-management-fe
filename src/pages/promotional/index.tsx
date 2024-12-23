import {
  BarsOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space, TableProps, Tooltip } from "antd";
import { CommonSearch, CommonTable } from "components/common";
import PromotionalModal from "components/Modal/Promotional";
import { APP_NAME } from "constant";
import { initPromotional } from "constant/initial";
import { IPromotional } from "constant/interface";
import { ModalType, ModalTypeType } from "constant/type";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { promotionalService } from "services/promotional";

const Promotional: FC = () => {
  const [open, setOpen] = useState<ModalType<IPromotional>>({
    type: "",
    item: initPromotional,
  });
  const [promotionals, setPromotionals] = useState<Array<IPromotional>>([]);
  const [originalPromotionals, setOriginalPromotionals] = useState<Array<IPromotional>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
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
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: IPromotional) => {
        return (
          <Space>
            <Tooltip placement="top" title="Chương trình">
              <Button
                type="link"
                size="small"
                icon={<BarsOutlined />}
                onClick={() => {
                  navigate(ROUTE_URL.PROMOTIONAL + `/detail/${value}`, {
                    state: { extraData: rec },
                  });
                }}
              />
            </Tooltip>

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
                onConfirm={() => handleDeletePromotional(value)}
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
  const getListPromotional = async () => {
    setIsLoading(true);
    const res = await promotionalService.getListPromotional();
    setPromotionals(res);
    setOriginalPromotionals(res);
    setIsLoading(false);
  };
  useEffect(() => {
    document.title = `Quản lý chương trình khuyến mãi - ${APP_NAME}`;
    getListPromotional();
  }, []);
  return (
    <div className="product-page">
      <div className="table-headding">
        <h1>Quản lý chương trình khuyến mãi</h1>
        <Button
          type="default"
          color="default"
          className="btn-add"
          size="large"
          onClick={() => handleOpenModal("create", initPromotional)}
          icon={<PlusOutlined />}
        >
          Tạo chương trình
        </Button>
      </div>

      <CommonSearch
        originalData={originalPromotionals}
        data={promotionals}
        setData={setPromotionals}
        onRefresh={getListPromotional}
      />
      <CommonTable
        originalData={originalPromotionals}
        data={promotionals}
        setData={setPromotionals}
        isLoading={isLoading}
        columns={columns}
      />
      <PromotionalModal open={open} setOpen={setOpen} getList={getListPromotional}/>
    </div>
  );
};
export default Promotional;
