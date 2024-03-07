import { memo } from "react";
import Select from "react-select";

function Dropdown(props) {
  const {
    options = [],
    onChange = () => {},
    isMulti = false,
    isSearchable = true,
  } = props;

  return (
    <Select
      {...props}
      options={options}
      onChange={onChange}
      isMulti={isMulti}
      isSearchable={isSearchable}
    />
  );
}

export default memo(Dropdown);
