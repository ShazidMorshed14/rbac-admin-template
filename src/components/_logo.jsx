import React from "react";
import { rem } from "@mantine/core";
import LogoIcon from "../images/logo.png";

export function Logo() {
  return (
    <img
      src={LogoIcon}
      alt=""
      srcset=""
      style={{ height: "2em", width: "auto" }}
    />
  );
}
