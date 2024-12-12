import { RedoOutlined } from "@ant-design/icons";
import { Button, Space, TableProps } from "antd";
import BoothModal from "components/Modal/Booth";
import TableSearch from "components/TableSearch";
import { initBooth, initProduct } from "constant/initial";
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
  const [categories, setCategories] = useState<Array<ICategory>>([]);

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
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value: string | number, rec: IBooth) => {
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
                handleDeleteBooth(value);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  const getListBooth = async () => {
    const res = await boothService.getListBooth();
    setBooths(res);
  };
  useEffect(() => {
    (async () => {
      const res = await categoryService.getListCategory();
      setCategories(res);
      getListBooth();
    })();
  }, []);

  return (
    <div className="product-page">
      <h1 style={{ marginBottom: 20 }}>Quản lý gian hàng</h1>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          handleOpenModal("create", initProduct);
        }}
      >
        Tạo gian hàng
      </Button>
      <Button type="link" onClick={getListBooth}>
        <RedoOutlined />
      </Button>
      <div className="floorplant">
        <img src={floorplant} alt="" />
      </div>
      <TableSearch columns={columns} data={booths} />
      <BoothModal open={open} setOpen={setOpen} categories={categories} />
    </div>
  );
};
export default Booth;
