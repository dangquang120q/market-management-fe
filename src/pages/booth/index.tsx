import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Image, Popconfirm, Space, TableProps, Tooltip } from "antd";
import { CommonSearch, CommonTable } from "components/common";
import BoothModal from "components/Modal/Booth";
import { APP_NAME } from "constant";
import { initBooth } from "constant/initial";
import { IBooth, ICategory } from "constant/interface";
import { ModalType, ModalTypeType } from "constant/type";
import { FC, useEffect, useState } from "react";
import floorplant from "resources/image/floorplant.png";
import { boothService } from "services/booth";
import { categoryService } from "services/category";

const Booth: FC = () => {
  const [open, setOpen] = useState<ModalType<IBooth>>({
    type: "",
    item: initBooth,
  });
  const [booths, setBooths] = useState<Array<IBooth>>([]);
  const [originalBooths, setOriginalBooths] = useState<Array<IBooth>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [visibleImage, setVisibleImage] = useState<boolean>(false);

  const handleOpenModal = (status: ModalTypeType, item: IBooth) => {
    setOpen({
      type: status,
      item,
    });
  };
  const handleDeleteBooth = async (id: string | number) => {
    await boothService.deleteBooth({ id });
    await getListBooth();
  };
  const columns: TableProps<IBooth>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render(_value, _record, index) {
        return index + 1;
      },
    },
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên gian hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại hàng",
      dataIndex: "categoryId",
      key: "categoryId",
      filters: categories.map((item: ICategory) => ({
        text: item.name,
        value: item.id,
      })),
      onFilter: (value, rec) => rec.categoryId == value,
      render: (value) => categories.find((item) => item.id == value)?.name,
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: IBooth) => {
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
                onConfirm={() => handleDeleteBooth(value)}
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
  const getListBooth = async () => {
    setIsLoading(true);
    const res = await boothService.getListBooth();
    setBooths(res);
    setOriginalBooths(res);
    setIsLoading(false);
  };
  useEffect(() => {
    document.title = `Quản lý gian hàng - ${APP_NAME}`;
    (async () => {
      const res = await categoryService.getListCategory();
      setCategories(res);
      getListBooth();
    })();
  }, []);

  return (
    <div className="product-page">
      <div className="table-headding">
        <h1>Quản lý gian hàng</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button
            type="default"
            color="default"
            className="btn-add"
            size="large"
            onClick={() => handleOpenModal("create", initBooth)}
            icon={<PlusOutlined />}
          >
            Tạo gian hàng
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<FileImageOutlined />}
            onClick={() => setVisibleImage(true)}
          >
            Xem sơ đồ
          </Button>
        </div>
      </div>
      <CommonSearch
        originalData={originalBooths}
        data={booths}
        setData={setBooths}
        onRefresh={getListBooth}
      />
      <CommonTable
        originalData={originalBooths}
        data={booths}
        setData={setBooths}
        isLoading={isLoading}
        columns={columns}
      />
      <BoothModal open={open} setOpen={setOpen} categories={categories} />
      <Image
        width={200}
        style={{ display: "none" }}
        src={floorplant}
        preview={{
          visible: visibleImage,
          src: floorplant,
          onVisibleChange: (value) => {
            setVisibleImage(value);
          },
        }}
      />
    </div>
  );
};
export default Booth;
