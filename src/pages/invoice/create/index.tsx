import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  TableProps,
} from "antd";
import NumberFormat from "components/NumberFormat";
import InvoiceModal from "components/page/invoice/InvoiceModal";
import SearchProduct from "components/page/invoice/SearchProduct";
import { initMember } from "constant/initial";
import { IInvoice, IMember, IProductInvoice } from "constant/interface";
import { FC, useEffect, useMemo, useState } from "react";
import { invoiceService } from "services/invoice";
import { memberService } from "services/member";
import { userStore } from "store/user";
import { genIdbyDate } from "utils";

const iconStyle = {
  cursor: "pointer",
  fontSize: 16,
};

const Invoice: FC = () => {
  const [selected, setSelected] = useState<Array<IProductInvoice>>([]);
  const [member, setMember] = useState<IMember & { exchangePoint: number }>({
    ...initMember,
    exchangePoint: 0,
  });
  const [members, setMembers] = useState<Array<IMember>>([]);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const { id } = userStore();
  const [modalOpen, setModalOpen] = useState(false);
  const total = useMemo(() => {
    return selected.reduce(
      (res, value: IProductInvoice) =>
        res + (value.promoPrice || value.price) * value.qty,
      0
    );
  }, [selected]);
  const handleDelete = (id: number | string) => {
    const temp = selected.filter((item: IProductInvoice) => item.id != id);
    setSelected([...temp]);
  };
  const handleChangeQuantity = (id: number | string, value: number) => {
    const temp = selected.map((item: IProductInvoice) => {
      if (item.id == id) {
        return {
          ...item,
          qty: item.qty + value > 1 ? item.qty + value : 1,
        };
      }
      return item;
    });
    setSelected([...temp]);
  };
  const invoice: IInvoice = {
    id: genIdbyDate(),
    memberId: member.id || "",
    staffId: id,
    products: selected,
    createdDate: new Date().getTime(),
    total: total,
    reducedAmount: member.exchangePoint,
  };
  const handleSaveInvoice = async () => {
    console.log(invoice);
    const res = await invoiceService.createInvoice(invoice);
    console.log(res);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setSelected([]);
    setMember({ ...initMember, exchangePoint: 0 });
    getListMember();
    setRefreshProducts((prev) => !prev);
  };
  const columns: TableProps<IProductInvoice>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render(_value, _record, index) {
        return index + 1;
      },
    },
    {
      title: "Tên mặt hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "promoPrice",
      key: "promoPrice",
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
      key: "qty",
      render: (value, rec) => {
        return (
          <Space>
            <MinusSquareOutlined
              style={iconStyle}
              onClick={() => {
                handleChangeQuantity(rec.id, -1);
              }}
            />
            <p>{value}</p>
            <PlusSquareOutlined
              style={iconStyle}
              onClick={() => {
                if (rec.saleTotal && rec.saleTotal > value)
                  handleChangeQuantity(rec.id, 1);
              }}
            />
          </Space>
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (_val, rec) => (rec.promoPrice || rec.price) * rec.qty,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (val) => {
        return (
          <Space>
            <Button
              type="link"
              danger
              onClick={() => {
                handleDelete(val);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  const getListMember = async () => {
    const res = await memberService.getListMember();
    setMembers(res);
  };
  useEffect(() => {
    getListMember();
  }, []);
  return (
    <div className="invoice-create">
      <h1>Hóa đơn thanh toán</h1>
      <Divider />
      <Row className="invoice-wrapper" gutter={30}>
        <Col span={16}>
          <div className="product-list">
            <SearchProduct selected={selected} setSelected={setSelected} refreshProducts={refreshProducts} />
            <h2>Danh sách mặt hàng</h2>
            <Table columns={columns} dataSource={selected} />
          </div>
        </Col>
        <Col span={8} className="total">
          <div className="total-wrapper">
            <h2>Thông tin chung </h2>
            <Space>
              <p>Hội viên:</p>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                onSelect={(e) => {
                  const temp = members.find((item: IMember) => item.id == e);
                  if (temp) setMember({ ...temp, exchangePoint: 0 });
                }}
                allowClear
                onClear={() => {
                  setMember({ ...initMember, exchangePoint: 0 });
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={members.map((item: IMember) => ({
                  label: item.id,
                  value: item.id,
                }))}
              />
            </Space>
            <Space>
              <p>Điểm tích lũy: {member.point}</p>
            </Space>
            <Space>
              <p>Đổi điểm</p>
              <InputNumber
                max={member.point}
                min={0}
                value={member.exchangePoint}
                onChange={(value) => {
                  setMember((prev) => ({ ...prev, exchangePoint: value || 0 }));
                }}
              />
            </Space>
            <Divider />
            <p>
              Tổng giá trị:{" "}
              <b style={{ fontSize: 18 }}>
                <NumberFormat value={total} /> đồng
              </b>
            </p>
            <p>
              Tổng tiền giảm:{" "}
              <b style={{ fontSize: 18 }}>
                <NumberFormat value={member.exchangePoint * 1000} /> đồng
              </b>
            </p>
            <div>
              <p>Tổng tiền thanh toán:</p>
              <p style={{ textAlign: "center" }} className="total-price">
                <b>
                  <NumberFormat value={total - member.exchangePoint * 1000} />
                </b>{" "}
                <b style={{ fontSize: 18 }}>đồng</b>
              </p>
            </div>
            <Button
              type="primary"
              onClick={handleSaveInvoice}
              disabled={selected.length < 1}
            >
              Lưu hóa đơn
            </Button>
          </div>
        </Col>
      </Row>
      <InvoiceModal open={modalOpen} setOpen={setModalOpen} invoice={invoice} onClose={handleModalClose} />
    </div>
  );
};
export default Invoice;
