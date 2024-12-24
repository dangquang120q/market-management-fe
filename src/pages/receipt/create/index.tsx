import {
  DeleteOutlined,
  LeftOutlined,
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
  Typography,
  Card,
  Tooltip,
} from "antd";
import NumberFormat from "components/NumberFormat";
import ReceiptModal from "components/page/receipt/ReceiptModal";
import SearchProduct from "components/page/receipt/SearchProduct";
import { APP_NAME } from "constant";
import { initSupplier } from "constant/initial";
import { IProductReceipt, IReceipt, ISupplier } from "constant/interface";
import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { receiptService } from "services/receipt";
import { supplierService } from "services/supplier";
import { userStore } from "store/user";
import { genIdbyDate } from "utils";

const { Text } = Typography;

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
  const navigate = useNavigate();
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
      render: (val, rec) => {
        return (
          <Space>
            <NumberFormat value={val || rec.price} /> đ
          </Space>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
      key: "qty",
      render: (value, rec) => {
        return (
          <Space>
            <Button
              icon={<MinusSquareOutlined />}
              type="link"
              onClick={() => {
                handleChangeQuantity(rec.id, -1);
              }}
            />
            <p>{value}</p>
            <Button
              icon={<PlusSquareOutlined />}
              type="link"
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
      render: (_val, rec) => {
        return (
          <Space>
            <NumberFormat value={rec.importPrice * rec.qty} /> đ
          </Space>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (val) => {
        return (
          <Space>
            <Tooltip placement="top" title="Xóa">
              <Button
                icon={<DeleteOutlined />}
                type="link"
                size="small"
                danger
                onClick={() => {
                  handleDelete(val);
                }}
              />
            </Tooltip>
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
    document.title = `Hóa đơn nhập hàng - ${APP_NAME}`;
    getListSuppliers();
  }, []);
  console.log(selected);

  return (
    <div className="invoice-create">
      <Space>
        <Tooltip placement="top" title="Quay về">
          <Button
            type="link"
            size="large"
            icon={<LeftOutlined />}
            onClick={() => {
              navigate(ROUTE_URL.RECEIPT);
            }}
          />
        </Tooltip>
        <h1>Hóa đơn nhập hàng</h1>
      </Space>
      <Divider />

      <Row gutter={30}>
        <Col span={9}>
          <Card title="Thêm mặt hàng">
            <h2>Nhà cung cấp</h2>
            <Select
              showSearch
              style={{ width: "100%", marginBottom: 20 }}
              placeholder="Chọn nhà cung cấp"
              optionFilterProp="children"
              onSelect={(e) => {
                const temp = suppliers.find((item: ISupplier) => item.id == e);
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
            <SearchProduct selected={selected} setSelected={setSelected} />
          </Card>
        </Col>
        <Col span={15}>
          <Card title="Danh sách mặt hàng">
            <Table columns={columns} dataSource={selected} />
            <Divider />
            <div style={{ textAlign: "center" }}>
              <Text strong>Tổng giá trị:</Text>
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
          </Card>
        </Col>
      </Row>
      <ReceiptModal open={modalOpen} setOpen={setModalOpen} receipt={receipt} />
    </div>
  );
};
export default Receipt;
