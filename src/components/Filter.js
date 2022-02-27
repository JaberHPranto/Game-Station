import { Select } from "antd";
import React from "react";

const { Option } = Select;

function Filter({ handleSelect }) {
  return (
    <Select
      placeholder="Select sort option"
      className="select-filter"
      onChange={handleSelect}
    >
      <Option value="name">Name</Option>
      <Option value="-rating">Rating</Option>
      <Option value="-released">Released</Option>
    </Select>
  );
}

export default Filter;
