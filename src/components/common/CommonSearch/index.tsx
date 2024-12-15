import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { T } from "constant/type";
import { useDebounce } from "hooks/useDebounce";
import { FC, useCallback, useEffect, useState } from "react";

const { Search } = Input;

const CommonSearch: FC<{
  data: Array<T>;
  originalData: Array<T>;
  onRefresh: () => void;
  setData: (data: Array<T>) => void;
}> = ({ data, originalData, setData, onRefresh }) => {
  const [key, setKey] = useState("");
  const debounceKey = useDebounce(key);
  const search = useCallback(async () => {
    if (debounceKey == "") {
      setData(originalData);
    } else {
      const res = data.filter((item) => {
        return item.name.toLowerCase().includes(debounceKey.toLowerCase());
      });
      setData(res);
    }
  }, [debounceKey]);
  useEffect(() => {
    search();
  }, [debounceKey, search]);

  const onChange = (value: string) => {
    setKey(value);
  };

  const handleRefresh = () => {
    setKey("");
    onRefresh();
  };
  return (
    <div className="common-search-container">
      <Search
        placeholder="Tìm kiếm"
        enterButton={
          <Button
            type="primary"
            className="btn-search"
            icon={<SearchOutlined />}
          />
        }
        size="large"
        className="input-search"
        value={key}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <Button
        icon={<RedoOutlined />}
        color="primary"
        variant="outlined"
        size="large"
        onClick={() => handleRefresh()}
      >
        Làm mới
      </Button>
    </div>
  );
};
export default CommonSearch;
