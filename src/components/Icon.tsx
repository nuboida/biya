import React from "react";
import { IconProps } from "./models/Icons.models";
import { ReactSVG } from "react-svg";


export const BiyaIcon = ({
  name,
  className = ""
}: IconProps) => {
  return (
    <ReactSVG
      src={`/icons/${name}.svg`}
      wrapper="span"
      className={className}
    />
  )
}
