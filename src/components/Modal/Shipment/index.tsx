import { Button, Form, Input, Modal, Space } from "antd";
import showMessage from "components/Message";
import { initProductReceipt } from "constant/initial";
import { IProductReceipt } from "constant/interface";
import { ModalType } from "constant/type";
import { Dispatch, FC, SetStateAction } from "react";
import { productService } from "services/product";

const ShipmentModal: FC<{
  open: ModalType<IProductReceipt>;
  setOpen: Dispatch<SetStateAction<ModalType<IProductReceipt>>>;
  fetchData: any;
}> = ({ open, setOpen, fetchData }) => {
  const handleClose = () => {
    setOpen({
      type: "",
      item: initProductReceipt,
    });
  };

  const handleSubmit = async (value: any) => {
    console.log(value, open.item);
    if (open.item.remain && value.count > open.item.remain) {
      showMessage(
        "warning",
        "Số lượng xuất vượt quá số lượng hàng đang có trong kho"
      );
      return;
    }
    try {
      const res = await productService.releaseProduct({
        id: open.item.id,
        count: +value.count,
        productId: open.item.productId || "",
      });
      console.log(res);
      showMessage("success", "Xuất kho thành công");
      fetchData && fetchData();
    } catch (error) {
      showMessage("error", "Loại hàng đã tồn tại!");
    }
  };
  return (
    <Modal
      className="app-modal"
      open={open.type != ""}
      onCancel={handleClose}
      footer={null}
      title="Xuất kho"
      destroyOnClose
    >
      <Form initialValues={open.item} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="receiptId" label="Mã lô hàng">
          <Input readOnly size="large" />
        </Form.Item>
        <Form.Item
          name="count"
          label="Số lượng xuất"
          rules={[
            {
              max: open.item.remain,
              message: "Số lượng xuất vượt quá số lượng hàng đang có trong kho",
            },
          ]}
        >
          <Input size="large" type="number" />
        </Form.Item>
        <Space className="button-space">
          <Button type="primary" size="large" htmlType="submit">
            Lưu loại hàng
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};
export default ShipmentModal;
