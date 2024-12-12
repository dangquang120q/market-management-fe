import { Button, Form, Input, Modal, Select, Space } from "antd";
import showMessage from "components/Message";
import { initBooth } from "constant/initial";
import { IBooth, ICategory } from "constant/interface";
import { ModalType } from "constant/type";
import { Dispatch, FC, SetStateAction } from "react";
import { boothService } from "services/booth";

const { Option } = Select;

const BoothModal: FC<{
  open: ModalType<IBooth>;
  setOpen: Dispatch<SetStateAction<ModalType<IBooth>>>;
  categories: Array<ICategory>;
}> = ({ open, setOpen, categories }) => {
  const handleClose = () => {
    setOpen({
      type: "",
      item: initBooth,
    });
  };
  const handleSubmit = async (value: any) => {
    console.log(value);
    try {
      if (open.type == "create") {
        await boothService.addBooth(value);
      } else {
        await boothService.updateBooth(value);
      }
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
      title="Chi tiết gian hàng"
      destroyOnClose
    >
      <Form initialValues={open.item} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="id" label="Mã gian hàng">
          <Input readOnly={open.type == "edit"} size="large" />
        </Form.Item>
        <Form.Item name="name" label="Tên gian hàng">
          <Input size="large" />
        </Form.Item>
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
        {/* <Form.Item name="description" label="Mô tả">
          <Input.TextArea size="large" />
        </Form.Item> */}
        <Space className="button-space">
          <Button type="primary" size="large" htmlType="submit">
            Lưu gian hàng
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};
export default BoothModal;
