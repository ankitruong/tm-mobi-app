import { Circle } from "@shopify/react-native-skia";
import React from "react";
import { SharedValue } from "react-native-reanimated";

export type TooltipProps = {
  x: SharedValue<number>;
  y: SharedValue<number>;
  color: string;
};

const Tooltip = ({ x, y, color }: TooltipProps) => {
  return <Circle cx={x} cy={y} r={8} color={color} />;
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
