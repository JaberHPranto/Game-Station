import { Input } from "antd";
import React from "react";
const { Search } = Input;

function SearchBox({ handleSearch }) {
  return (
    <Search
      placeholder="input search text"
      onSearch={handleSearch}
      className="searchBox"
    />
  );
}

export default SearchBox;
