import React from "react";
import { FallingLines } from "react-loader-spinner";
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height:'100vh'
      }}
    >
      <FallingLines
        color="#ffd89b"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
};

export default Loader;
