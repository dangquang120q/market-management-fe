import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import showMessage from "components/Message";
import { ROLE } from "constant";
import { initStaff } from "constant/initial";
import { IStaff } from "constant/interface";
import { ModalType, RoleType } from "constant/type";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction } from "react";
import { userService } from "services/user";

const StaffModal: FC<{
  open: ModalType<IStaff>;
  setOpen: Dispatch<SetStateAction<ModalType<IStaff>>>;
}> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen({
      type: "",
      item: initStaff,
    });
  };
  const handleSubmit = async (value: IStaff) => {
    const dob = value.dob;
    value.dob = dayjs(value.dob).format("DD-MM-YYYY");
    console.log(value);
    try {
      if (open.type == "create") {
        const data = {
          ...value,
          id: "NV" + value.phone?.slice(0, 8),
          username: "NV" + value.phone?.slice(0, 8),
          password: dayjs(dob).format("DDMMYYYY"),
        };
        await userService.addStaff(data);
      } else {
        await userService.updateStaff(value);
      }
    } catch (error) {
      showMessage("error", "Nhân viên đã tồn tại!");
    }
  };
  return (
    <Modal
      className="app-modal"
      open={open.type != ""}
      onCancel={handleClose}
      footer={null}
      title="Chi tiết nhân viên"
      destroyOnClose
      width={600}
    >
      <Form
        initialValues={{
          ...open.item,
          dob: open.item.dob
            ? dayjs(open.item.dob, "DD-MM-YYYY")
            : dayjs(undefined),
        }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item name="id" label="Mã nhân viên">
          <Input size="large" readOnly />
        </Form.Item>
        <Form.Item name="name" label="Tên hội viên">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại">
          <Input readOnly={open.type == "edit"} size="large" />
        </Form.Item>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item name="role" label="Chức vụ">
              <Select size="large">
                {Object.keys(ROLE).map((key) => (
                  <Select.Option value={key}>
                    {ROLE[key as RoleType]}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dob" label="Ngày sinh">
              <DatePicker />
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
export default StaffModal;
