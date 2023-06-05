import React from "react";
import TitleBox from "./TitleBox";
import { Loader } from "@mantine/core";

const LoadingView = ({ title }) => {
  return (
    <div
      style={{
        height: "80vh",
        width: "80vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* <TitleBox title={title} py="sm" /> */}
      <Loader variant="dots" />
    </div>
  );
};

export default LoadingView;
