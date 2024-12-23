import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import showMessage from "components/Message";
import { initSupplier } from "constant/initial";
import { ISupplier } from "constant/interface";
import { ModalType } from "constant/type";
import { Dispatch, FC, SetStateAction } from "react";
import { supplierService } from "services/supplier";

const SupplierModal: FC<{
  open: ModalType<ISupplier>;
  setOpen: Dispatch<SetStateAction<ModalType<ISupplier>>>;
  getList: () => void;
}> = ({ open, setOpen, getList }) => {
  const handleClose = () => {
    setOpen({
      type: "",
      item: initSupplier,
    });
  };
  const handleSubmit = async (value: any) => {
    console.log(value);
    try {
      if (open.type == "create") {
        await supplierService.addSupplier(value);
      } else {
        await supplierService.updateSupplier(value);
      }
      getList();
    } catch (error) {
      showMessage("error", "Nhà cung cấp đã tồn tại!");
    }
  };

  const getTitleModal = (typeModal: string): string => {
    switch (typeModal) {
      case 'create': 
        return 'Thêm mới nhà cung cấp';
      case 'edit':
        return `Sửa nhà cung cấp';`;
      default: 
      return 'Chi tiết nhà cung cấp';
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
      <Form initialValues={open.item} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="id" label="Mã">
          <Input readOnly size="large" />
        </Form.Item>
        <Form.Item name="name" label="Tên nhà cung cấp">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input size="large" />
        </Form.Item>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item name="phone" label="Số điện thoại">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tax" label="Mã số thuế">
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="website" label="Website">
          <Input size="large" />
        </Form.Item>
        <Space className="button-space">
          <Button type="primary" size="large" htmlType="submit">
            Lưu nhà cung cấp
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};
export default SupplierModal;
