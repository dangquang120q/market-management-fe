import { FormInstance, Input, Table, TableProps } from "antd";
import NumberFormat from "components/NumberFormat";
import { IProduct } from "constant/interface";
import { useDebounce } from "hooks/useDebounce";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { productService } from "services/product";

const { Search } = Input;

const SearchProduct: FC<{
  form: FormInstance;
}> = ({ form }) => {
  const [dataSource, setDataSource] = useState<Array<IProduct>>([]);
  const [key, setKey] = useState("");
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
      title: "Giá gốc",
      dataIndex: "price",
      key: "price",
      render: (val) => <NumberFormat value={val} />,
    },
    {
      title: "Còn lại",
      dataIndex: "saleTotal",
      key: "saleTotal",
    },
  ];

  const handleSelect = (record: IProduct) => {
    console.log(record);

    form.setFieldsValue({
      name: record.name,
      productId: record.id,
    });
    setKey("");
    // setDataSource([])
  };

  const getListProduct = async () => {
    const res = await productService.getListProduct();
    setData(res);
  };
  useEffect(() => {
    getListProduct();
  }, []);
  return (
    <div className="search-product" style={{ marginBottom: 30 }}>
      <h2>Tìm mặt hàng</h2>
      <Search
        allowClear
        placeholder="Tìm kiếm"
        enterButton="Search"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {dataSource.length > 0 && (
        <Table
          ref={tableRef}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          className="result-table"
          onRow={(record) => {
            return {
              onClick: () => {
                handleSelect(record);
              },
            };
          }}
        />
      )}
    </div>
  );
};
export default SearchProduct;
