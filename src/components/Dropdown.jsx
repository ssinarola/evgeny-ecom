import { memo } from "react";
import Select from "react-select";

function Dropdown(props) {
  const {
    options = [],
    onChange = () => {},
    isMulti = false,
    isSearchable = true,
    placeholder="Select...",
    defaultInputValue,
    defaultValue
  } = props;

  return (
    <Select
      {...props}
      options={options}
      onChange={onChange}
      isMulti={isMulti}
      isSearchable={isSearchable}
      placeholder={placeholder}
      defaultInputValue={defaultInputValue}
      defaultValue={defaultValue}
    />
  );
}

export default memo(Dropdown);
