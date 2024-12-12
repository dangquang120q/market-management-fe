import { Button, DatePicker, Form, Input, Modal, Space } from "antd";
import showMessage from "components/Message";
import { initPromotional } from "constant/initial";
import { IPromotional } from "constant/interface";
import { ModalType } from "constant/type";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction } from "react";
import { promotionalService } from "services/promotional";

const { RangePicker } = DatePicker;

const PromotionalModal: FC<{
  open: ModalType<IPromotional>;
  setOpen: Dispatch<SetStateAction<ModalType<IPromotional>>>;
}> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen({
      type: "",
      item: initPromotional,
    });
  };
  const handleSubmit = async (value: any) => {
    const data = {
      ...value,
      startDate: dayjs(value.duration[0]).format("MM/DD/YYYY"),
      endDate: dayjs(value.duration[1]).format("MM/DD/YYYY"),
    };
    console.log(data);
    try {
      if (open.type == "create") {
        await promotionalService.addPromotional(data);
      } else {
        await promotionalService.updatePromotional(data);
      }
    } catch (error) {
      showMessage("error", "Sửa chương trình không thành công!");
    }
  };
  return (
    <Modal
      className="app-modal"
      open={open.type != ""}
      onCancel={handleClose}
      footer={null}
      title="Chi tiết chương trình"
      destroyOnClose
    >
      <Form
        initialValues={{
          ...open.item,
          duration: [
            dayjs(open.item.startDate || undefined),
            dayjs(open.item.endDate || undefined),
          ],
        }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item name="id" label="Mã chương trình">
          <Input readOnly size="large" />
        </Form.Item>
        <Form.Item name="name" label="Tên chương trình">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="duration" label="Thời gian diễn ra">
          <RangePicker />
        </Form.Item>
        <Space className="button-space">
          <Button type="primary" size="large" htmlType="submit">
            Lưu chương trình
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};
export default PromotionalModal;
