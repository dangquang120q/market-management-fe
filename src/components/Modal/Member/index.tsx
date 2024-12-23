import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Space,
} from "antd";
import showMessage from "components/Message";
import { initMember } from "constant/initial";
import { IMember } from "constant/interface";
import { ModalType } from "constant/type";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction } from "react";
import { memberService } from "services/member";

const MemberModal: FC<{
  open: ModalType<IMember>;
  setOpen: Dispatch<SetStateAction<ModalType<IMember>>>;
  getList: () => void;
}> = ({ open, setOpen, getList }) => {
  const handleClose = () => {
    setOpen({
      type: "",
      item: initMember,
    });
  };
  const handleSubmit = async (value: IMember) => {
    value.dob = dayjs(value.dob).format("DD-MM-YYYY");
    // console.log(value);
    try {
      if (open.type == "create") {
        await memberService.addMember(value);
      } else {
        await memberService.updateMember(value);
      }
      getList();
    } catch (error) {
      if (error) {
        showMessage("error", "Mã hội viên đã tồn tại!");
      }
    }
  };

  const getTitleModal = (typeModal: string): string => {
    switch (typeModal) {
      case 'create': 
        return 'Thêm mới hội viên';
      case 'edit':
        return `Sửa hội viên`;
      default: 
      return 'Chi tiết hội viên'
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
        initialValues={{
          ...open.item,
          dob: open.item.dob
            ? dayjs(open.item.dob, "MM-DD-YYYY")
            : dayjs(undefined),
        }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item name="name" label="Tên hội viên">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="id" label="Số điện thoại">
          <Input readOnly={open.type == "edit"} size="large" />
        </Form.Item>
        <Form.Item name="gender" label="Giới tính">
          <Radio.Group>
            <Radio value="Nữ"> Nữ </Radio>
            <Radio value="Nam"> Nam </Radio>
            <Radio value="Khác"> Khác </Radio>
          </Radio.Group>
        </Form.Item>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item name="dob" label="Ngày sinh">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="point" label="Điểm tích lũy">
              <Input size="large" type="number" readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Space className="button-space">
          <Button type="primary" size="large" htmlType="submit">
            Lưu hội viên
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};
export default MemberModal;
