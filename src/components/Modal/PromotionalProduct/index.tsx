import { Button, Form, Input, Modal, Space } from "antd";
import showMessage from "components/Message";
import SearchProduct from "components/page/promotional/SearchProduct";
import { initPromoProduct } from "constant/initial";
import { IPromoProduct } from "constant/interface";
import { ModalType } from "constant/type";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { promotionalService } from "services/promotional";

const PromoProductModal: FC<{
  open: ModalType<IPromoProduct>;
  setOpen: Dispatch<SetStateAction<ModalType<IPromoProduct>>>;
  fetchData: any;
  promotionalId: string | number;
}> = ({ open, setOpen, fetchData, promotionalId }) => {
  const [form] = Form.useForm();
  const handleClose = () => {
    setOpen({
      type: "",
      item: initPromoProduct,
    });
    form.resetFields();
  };
  const handleSubmit = async (value: any) => {
    const data = {
      ...value,
      promotionalId,
      id: open.item.id,
    };
    console.log(data);
    try {
      if (open.type == "create") {
        await promotionalService.addProductPromotional(data);
      } else {
        await promotionalService.updateProductPromotional(data);
      }
      fetchData();
    } catch (error) {
      showMessage("error", "Thêm mặt hàng thất bại!");
    }
  };
  useEffect(() => {
    form.setFieldsValue(open.item);
  }, [open.item]);
  const getTitleModal = (typeModal: string): string => {
    switch (typeModal) {
      case 'create': 
        return 'Thêm mới mặt hàng khuyến mãi';
      case 'edit':
        return `Sửa mặt hàng khuyến mãi`;
      default: 
      return 'Chi tiết mặt hàng khuyến mãi'
    }
  }
  return (
    <Modal
      className="app-modal"
      open={open.type != ""}
      onCancel={handleClose}
      footer={null}
      title={getTitleModal(open.type)}
      destroyOnClose
      width={600}
    >
      <Form
        initialValues={open.item}
        onFinish={handleSubmit}
        layout="vertical"
        form={form}
      >
        <SearchProduct form={form} />
        <Form.Item
          name="productId"
          label="Mã mặt hàng"
          rules={[{ required: true, message: "Chưa chọn mặt hàng!" }]}
        >
          <Input readOnly size="large" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên mặt hàng"
          rules={[{ required: true, message: "Chưa chọn mặt hàng!" }]}
        >
          <Input readOnly size="large" />
        </Form.Item>
        <Form.Item
          name="promoPrice"
          label="Giá khuyến mãi"
          rules={[{ required: true, message: "Chưa điền mã khuyến mãi!" }]}
        >
          <Input size="large" type="number" />
        </Form.Item>
        <Space className="button-space">
          <Button type="primary" size="large" htmlType="submit">
            Lưu mặt hàng
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};
export default PromoProductModal;
