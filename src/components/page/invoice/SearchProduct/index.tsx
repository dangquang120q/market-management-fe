import { Input, Table, TableProps } from "antd";
import showMessage from "components/Message";
import { IProduct, IProductInvoice } from "constant/interface";
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

const { Search } = Input;

const SearchProduct: FC<{
  selected: Array<IProductInvoice>;
  setSelected: Dispatch<SetStateAction<Array<IProductInvoice>>>;
}> = ({ selected, setSelected }) => {
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
        return (
          item.name.toLowerCase().includes(debounceKey.toLowerCase()) &&
          item.saleTotal
        );
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
      dataIndex: "promoPrice",
      key: "promoPrice",
    },
    {
      title: "Còn lại",
      dataIndex: "saleTotal",
      key: "saleTotal",
    },
  ];

  const handleSelect = (record: IProduct) => {
    const findProduct: number = selected.findIndex(
      (item: IProductInvoice) => item.id == record.id
    );
    if (findProduct == -1) {
      setSelected([
        ...selected,
        {
          ...record,
          qty: 1,
        },
      ]);
    } else {
      showMessage("warning", "Sản phẩm đã ở trong danh sách");
    }
  };

  const getListProduct = async () => {
    const res = await productService.getListProduct();
    setData(res);
  };
  useEffect(() => {
    getListProduct();
  }, []);
  return (
    <div className="search-product" style={{ marginBottom: 10, position: 'relative' }}>
    <h2>Tìm mặt hàng</h2>
    <Search
      style={{ maxWidth: '100%' }}
      placeholder="Tìm kiếm mặt hàng"
      allowClear
      onChange={(e) => {
        onChange(e.target.value);
      }}
      size="large"
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
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          right: 0, 
          zIndex: 1, 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              handleSelect(record);
            },
            style: { cursor: 'pointer' }
          };
        }}
      />
    )}
  </div>
  );
};
export default SearchProduct;
