import { Input, Table, TableProps } from "antd";
import { T } from "constant/type";
import { useDebounce } from "hooks/useDebounce";
import { FC, useCallback, useEffect, useState } from "react";

const { Search } = Input;

const TableSearch: FC<{
  columns: TableProps<T>["columns"];
  data: Array<T>;
}> = ({ columns, data }) => {
  const [dataSource, setDataSource] = useState(data);
  const [key, setKey] = useState("");
  const debounceKey = useDebounce(key);
  const search = useCallback(async () => {
    if (debounceKey == "") {
      setDataSource(data);
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
  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const handleTableChange = (_pagination: any, filter: any) => {
    const res = data.filter((item) => {
      for (const key in filter) {
        if (filter[key] && !filter[key].includes(item[key])) return false;
      }
      return true;
    });
    setDataSource(res);
  };
  return (
    <div className="table-search">
      <Search
        placeholder="Tìm kiếm"
        enterButton="Search"
        size="large"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <h3>Số lượng: {dataSource.length}</h3>
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={handleTableChange}
      />
    </div>
  );
};
export default TableSearch;
