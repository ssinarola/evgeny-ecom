import React from "react";
import LoadingIcon from "../assets/LoadingIcon";

function Loader() {
  return (
    <div className="flex py-5 mt-20 items-center justify-center" style={{ height: "calc(100vh - 210px)" }}>
      <div role="status">
        <LoadingIcon />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
