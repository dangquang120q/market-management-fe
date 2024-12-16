import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import showMessage from "components/Message";
import { initProduct } from "constant/initial";
import { ICategory, IProduct } from "constant/interface";
import { ModalType } from "constant/type";
import { Dispatch, FC, SetStateAction } from "react";
import { productService } from "services/product";

const { Option } = Select;

const ProductModal: FC<{
  open: ModalType<IProduct>;
  setOpen: Dispatch<SetStateAction<ModalType<IProduct>>>;
  categories: Array<ICategory>;
}> = ({ open, setOpen, categories }) => {
  const handleClose = () => {
    setOpen({
      type: "",
      item: initProduct,
    });
  };
  const handleSubmit = async (value: any) => {
    console.log(value);
    try {
      if (open.type == "create") {
        await productService.addProduct(value);
      } else {
        await productService.updateProduct(value);
      }
    } catch (error) {
      showMessage("error", "Mặt hàng đã tồn tại!");
    }
  };

  const getTitleModal = (typeModal: string): string => {
    switch (typeModal) {
      case 'create': 
        return 'Thêm mới mặt hàng';
      case 'edit':
        return `Sửa - ${open.item.name}`;
      default: 
      return 'Chi tiết mặt hàng'
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
    >
      <Form initialValues={open.item} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="id" label="Mã mặt hàng">
          <Input readOnly size="large" />
        </Form.Item>
        <Form.Item name="name" label="Tên mặt hàng">
          <Input size="large" />
        </Form.Item>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item name="unit" label="Đơn vị">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="price" label="Giá bán">
              <Input size="large" type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="total" label="Tổng số lượng">
              <Input size="large" type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="categoryId" label="Loại hàng">
          <Select
            placeholder="Select a option and change input text above"
            allowClear
            size="large"
          >
            {categories.map((item: ICategory) => (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
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
export default ProductModal;
