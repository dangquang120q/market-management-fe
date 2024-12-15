import { Table, TableProps } from "antd";
import { T } from "constant/type";
import { FC, useEffect, useState } from "react";

const CommonTable: FC<{
  columns: TableProps<T>["columns"];
  originalData: Array<T>;
  data: Array<T>;
  setData: (data: Array<T>) => void;
  isLoading: boolean;
}> = ({ columns, data, originalData, setData, isLoading }) => {
  const [key, setKey] = useState<number>(0);
  useEffect(() => {
    setData(originalData);
    setKey((prev) => prev + 1);
  }, [originalData]);

  const handleTableChange = (_pagination: any, filter: any) => {
    const res = data.filter((item) => {
      for (const key in filter) {
        if (filter[key] && !filter[key].includes(item[key])) return false;
      }
      return true;
    });
    setData(res);
  };

  return (
    <div className="common-table-container">
      <Table
        key={key}
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        onChange={handleTableChange}
      />
      <h3 className="total-item">Số lượng: {data.length}</h3>
    </div>
  );
};
export default CommonTable;
