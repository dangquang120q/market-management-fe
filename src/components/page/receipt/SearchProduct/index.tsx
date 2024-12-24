import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Table,
  TableProps,
  Card,
} from "antd";
import { initProduct } from "constant/initial";
import { IProduct, IProductReceipt } from "constant/interface";
import dayjs from "dayjs";
import { useDebounce } from "hooks/useDebounce";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { productService } from "services/product";

const { Search, TextArea } = Input;

const SearchProduct: FC<{
  selected: Array<IProductReceipt>;
  setSelected: Dispatch<SetStateAction<Array<IProductReceipt>>>;
}> = ({ setSelected }) => {
  const [dataSource, setDataSource] = useState<Array<IProduct>>([]);
  const [key, setKey] = useState("");
  const [product, setProduct] = useState<IProduct>(initProduct);
  const [form] = Form.useForm();
  const [data, setData] = useState<Array<IProduct>>([]);
  const debounceKey = useDebounce(key);
  const tableRef = useRef<any>(null);
  const search = useCallback(async () => {
    if (debounceKey == "") {
      setDataSource([]);
    } else {
      const res = data.filter((item) => {
        return item.name.toLowerCase().includes(debounceKey.toLowerCase());
      });
      setDataSource(res);
    }
  }, [debounceKey]);
  useEffect(() => {
    search();
  }, [debounceKey, search]);

  const onChange = (value: string) => {
    setKey(value);
  };

  const columns: TableProps<IProduct>["columns"] = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên mặt hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
  ];

  const handleSelect = (record: IProduct) => {
    setProduct(record);
    setKey("");
  };
  const handleSubmit = (record: IProductReceipt) => {
    setSelected((prev) => [
      ...prev,
      {
        qty: +record.qty,
        importPrice: +record.importPrice,
        id: product.id,
        name: product.name,
        price: product.price,
        expDate: dayjs(record.expDate).format("MM/DD/YYYY"),
        mfgDate: dayjs(record.mfgDate).format("MM/DD/YYYY"),
      },
    ]);
    handleReset();
  };

  const handleChange = (value: any) => {
    const price = value.target.value || 0;
    const name = value.target.id;
    if (name.includes("Price")) {
      const qty = form.getFieldValue("qty") || 0;

      if (name == "importPrice") {
        form.setFieldValue("toltalImportPrice", qty * price);
      } else {
        form.setFieldValue("importPrice", qty == 0 ? 0 : price / qty);
      }
    } else {
      const importPrice = form.getFieldValue("importPrice") || 0;
      form.setFieldValue("toltalImportPrice", importPrice * price);
    }
  };
  const handleReset = () => {
    form.resetFields();
    setProduct(initProduct);
  };
  const getListProduct = async () => {
    const res = await productService.getListProduct();
    setData(res);
  };
  useEffect(() => {
    getListProduct();
  }, []);
  return (
    <Card title="Tìm mặt hàng">
      <div style={{ position: "relative" }}>
        <Search
          style={{ maxWidth: "100%", marginBottom: 10 }}
          placeholder="Tìm kiếm mặt hàng"
          allowClear
          size="large"
          value={key}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          enterButton
        />
        {debounceKey && (
          <Table
            ref={tableRef}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            className="result-table"
            scroll={{ y: 250 }}
            locale={{ emptyText: "Không tìm thấy sản phẩm" }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 1,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  handleSelect(record);
                },
                style: { cursor: "pointer" },
              };
            }}
          />
        )}
      </div>
      <div className="product-import">
        <Form onFinish={handleSubmit} form={form} onChange={handleChange}>
          <Row gutter={30}>
            <Col span={12}>
              <Form.Item label="Mã mặt hàng" required>
                <Input value={product.id} readOnly />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mặt hàng" required>
                <TextArea value={product.name} readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số lượng"
                name="qty"
                rules={[
                  {
                    required: true,
                    message: "Số lượng trống",
                  },
                ]}
              >
                <Input defaultValue={0} type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giá nhập"
                name="importPrice"
                rules={[
                  {
                    required: true,
                    message: "Giá nhập trống",
                  },
                ]}
              >
                <Input defaultValue={0} type="number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Tổng giá nhập"
                name="toltalImportPrice"
                rules={[
                  {
                    required: true,
                    message: "Tổng giá nhập trống",
                  },
                ]}
                labelCol={{ style: { fontWeight: 700 } }}
              >
                <Input defaultValue={0} type="number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Ngày sản xuất" name="mfgDate">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Hạn sử dụng" name="expDate">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center", gap: 20 }}
            >
              <Button type="primary" htmlType="submit">
                Thêm mặt hàng
              </Button>
              <Button type="primary" onClick={handleReset}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Card>
  );
};
export default SearchProduct;
