import {
  DeleteOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Row,
  Select,
  Space,
  Table,
  TableProps,
} from "antd";
import NumberFormat from "components/NumberFormat";
import ReceiptModal from "components/page/receipt/ReceiptModal";
import SearchProduct from "components/page/receipt/SearchProduct";
import { initSupplier } from "constant/initial";
import { IProductReceipt, IReceipt, ISupplier } from "constant/interface";
import { FC, useEffect, useMemo, useState } from "react";
import { receiptService } from "services/receipt";
import { supplierService } from "services/supplier";
import { userStore } from "store/user";
import { genIdbyDate } from "utils";

const iconStyle = {
  cursor: "pointer",
  fontSize: 16,
};

const Receipt: FC = () => {
  const [selected, setSelected] = useState<Array<IProductReceipt>>([]);
  const [supplier, setSupplier] = useState<
    ISupplier & { exchangePoint: number }
  >({
    ...initSupplier,
    exchangePoint: 0,
  });
  const [suppliers, setSuppliers] = useState<Array<ISupplier>>([]);
  const { id } = userStore();
  const [modalOpen, setModalOpen] = useState(false);
  const total = useMemo(() => {
    return selected.reduce(
      (res, value: IProductReceipt) => res + value.importPrice * value.qty,
      0
    );
  }, [selected]);
  const handleDelete = (id: number | string) => {
    const temp = selected.filter((item: IProductReceipt) => item.id != id);
    setSelected([...temp]);
  };
  const handleChangeQuantity = (id: number | string, value: number) => {
    const temp = selected.map((item: IProductReceipt) => {
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
  const receipt: IReceipt = {
    id: genIdbyDate(),
    supplierId: supplier.id || "",
    staffId: id,
    products: selected,
    createdDate: new Date().getTime(),
    total: total,
  };
  const handleSaveReceipt = async () => {
    try {
      const res = await receiptService.createReceipt(receipt);
      console.log(res);
      setModalOpen(true);
    } catch (error) {}
  };
  const columns: TableProps<IProductReceipt>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_val, _rec, id) => id + 1,
    },
    {
      title: "Tên mặt hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "importPrice",
      key: "importPrice",
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
                handleChangeQuantity(rec.id, 1);
              }}
            />
          </Space>
        );
      },
    },
    {
      title: "NSX",
      dataIndex: "mfgDate",
      key: "mfgDate",
    },
    {
      title: "HSD",
      dataIndex: "expDate",
      key: "expDate",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: "100px",
      render: (_val, rec) => rec.importPrice * rec.qty,
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
              size="small"
              onClick={() => {
                handleDelete(val);
              }}
              style={{ padding: 0 }}
            >
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];
  const getListSuppliers = async () => {
    const res = await supplierService.getListSupplier();
    setSuppliers(res);
  };
  useEffect(() => {
    getListSuppliers();
  }, []);
  console.log(selected);

  return (
    <div className="invoice-create">
      <h1>Hóa đơn nhập hàng</h1>
      <Divider />
      <Row className="invoice-wrapper" gutter={30}>
        <Col span={9} className="total">
          <div className="total-wrapper">
            <div>
              <h2>Nhà cung cấp</h2>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Search to Select"
                optionFilterProp="children"
                onSelect={(e) => {
                  const temp = suppliers.find(
                    (item: ISupplier) => item.id == e
                  );
                  if (temp) setSupplier({ ...temp, exchangePoint: 0 });
                }}
                allowClear
                onClear={() => {
                  setSupplier({ ...initSupplier, exchangePoint: 0 });
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={suppliers.map((item: ISupplier) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </div>
            <SearchProduct selected={selected} setSelected={setSelected} />
          </div>
        </Col>
        <Col span={15}>
          <div className="product-list">
            <h2>Danh sách mặt hàng</h2>
            <Table columns={columns} dataSource={selected} />
          </div>
          <Divider />
          <div>
            <b>Tổng giá trị:</b>
            <p style={{ textAlign: "center" }} className="total-price">
              <b>
                <NumberFormat value={total} />
              </b>{" "}
              <b style={{ fontSize: 18 }}>đồng</b>
            </p>
          </div>
          <Button
            type="primary"
            onClick={handleSaveReceipt}
            disabled={selected.length < 1}
          >
            Lưu hóa đơn
          </Button>
        </Col>
      </Row>
      <ReceiptModal open={modalOpen} setOpen={setModalOpen} receipt={receipt} />
    </div>
  );
};
export default Receipt;
