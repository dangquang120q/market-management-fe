import { Button, Popconfirm, Table, TableProps } from "antd";
import showMessage from "components/Message";
import NumberFormat from "components/NumberFormat";
import { APP_NAME } from "constant";
import { IProductReceipt } from "constant/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { statiticsService } from "services/statistic";

const Inventory: FC = () => {
  const [data, setData] = useState<
    Array<IProductReceipt & { key: number | string; productId: number }>
  >([]);
  const [selectedItems, _setSelectedItems] = useState<
    Array<IProductReceipt & { key: number | string; productId: number }>
  >([]);
  const fetchData = async () => {
    const res = await statiticsService.getListExcessProduct();
    console.log(res);
    const data = res.data.data
      .filter((item: IProductReceipt) => item.remain != 0)
      .map((item: IProductReceipt) => ({
        ...item,
        key: item.id,
      }));

    setData(data);
  };
  useEffect(() => {
    document.title = `Thống kê sản phẩm - Hàng tồn kho - ${APP_NAME}`;
    fetchData();
  }, []);
  // const rowSelection = {
  //   onChange: (_selectedRowKeys: any, selectedRows: any) => {
  //     setSelectedItems(selectedRows);
  //   },
  //   getCheckboxProps: (
  //     record: IProductReceipt & { key: number | string; productId: number }
  //   ) => {
  //     // const item = cartItems.find((el) => el.id == record.id);
  //     return {
  //       // Column configuration not to be checked
  //     };
  //   },
  // };
  console.log(selectedItems);
  const handleCancel = async (params: {
    id: number | string;
    productId: number | string;
    remain: number;
  }) => {
    try {
      const res = await statiticsService.cancelProductReceipt(params);
      if (res.status == 200) showMessage("success", "Hủy lô hàng thành công");
    } catch (error) {
      showMessage("error", "Hủy lô hàng thất bại!");
    }
  };
  const columns: TableProps<
    IProductReceipt & { key: number | string; productId: number }
  >["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_value, _record, index) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (val) => <NumberFormat value={val} />,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Số lượng",
      dataIndex: "remain",
      key: "remain",
      sorter: (a, b) => (a.remain || 0) - (b.remain || 0),
    },
    {
      title: "NSX",
      dataIndex: "mfgDate",
      key: "mfgDate",
      render: (val) => dayjs(val, "MM/DD/YYYY").format("DD/MM/YYYY"),
    },
    {
      title: "HSD",
      dataIndex: "expDate",
      key: "expDate",
      render: (val) => {
        const renderValue = dayjs(val, "MM/DD/YYYY").format("DD/MM/YYYY");
        return dayjs(val, "MM/DD/YYYY").isBefore(dayjs()) ? (
          <p style={{ color: "red" }}>{renderValue}</p>
        ) : (
          renderValue
        );
      },
      sorter: (a, b) =>
        dayjs(a.expDate, "MM/DD/YYYY").unix() -
        dayjs(b.expDate, "MM/DD/YYYY").unix(),
    },
    {
      title: "Hủy lô hàng",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <Popconfirm
          title="Hủy lô hàng"
          description="Xác nhận hủy lô hàng?"
          onConfirm={() => {
            handleCancel({
              id: val,
              productId: record.productId,
              remain: record.remain || 0,
            });
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Hủy
          </Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div className="best-seller">
      <h2 style={{ marginBottom: '15px'}}>Hàng tồn kho</h2>
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{
        //   type: "checkbox",
        //   ...rowSelection,
        //   selectedRowKeys: selectedItems.map((item) => item.key),
        // }}
      />
    </div>
  );
};
export default Inventory;
