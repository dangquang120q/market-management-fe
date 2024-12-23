import { Button, Form, Input, Modal, Space } from "antd";
import showMessage from "components/Message";
import { initCategory } from "constant/initial";
import { ICategory } from "constant/interface";
import { ModalType } from "constant/type";
import { Dispatch, FC, SetStateAction } from "react";
import { categoryService } from "services/category";

const CategoryModal: FC<{
  open: ModalType<ICategory>;
  setOpen: Dispatch<SetStateAction<ModalType<ICategory>>>;
  getList: () => void;
}> = ({ open, setOpen, getList }) => {
  const handleClose = () => {
    setOpen({
      type: "",
      item: initCategory,
    });
  };
  const handleSubmit = async (value: any) => {
    console.log(value);
    try {
      if (open.type == "create") {
        await categoryService.addCategory(value);
      } else {
        await categoryService.updateCategory(value);
      }
      getList();
    } catch (error) {
      showMessage("error", "Loại hàng đã tồn tại!");
    }
  };

  const getTitleModal = (typeModal: string): string => {
    switch (typeModal) {
      case 'create': 
        return 'Thêm mới loại hàng';
      case 'edit':
        return `Sửa loại hàng`;
      default: 
      return 'Chi tiết loại hàng'
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
        <Form.Item name="id" label="Mã loại hàng">
          <Input readOnly size="large" />
        </Form.Item>
        <Form.Item name="name" label="Tên loại hàng">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea size="large" />
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
export default CategoryModal;
