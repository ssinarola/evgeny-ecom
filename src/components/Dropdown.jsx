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
    defaultValue,
    onMenuOpen,
    value
  } = props;

  return (
    <Select
      {...props}
      value={value}
      options={options}
      onChange={onChange}
      isMulti={isMulti}
      isSearchable={isSearchable}
      placeholder={placeholder}
      defaultInputValue={defaultInputValue}
      defaultValue={defaultValue}
      onMenuOpen={onMenuOpen}
    />
  );
}

export default Dropdown;
