import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import { TIME_RANGES, TimeRange } from "@/store/constants/mocks";
import formatNumber from "@/utils/formatNumber";
import Feather from "@expo/vector-icons/Feather";
import { DashPathEffect, useFont } from "@shopify/react-native-skia";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import Tooltip from "./Tooltip";

type DataPoint = {
  price: number;
  timestamp: string;
};

type PriceChartProps = {
  data: DataPoint[];
  title: string;
  value: string;
  change: string;
  color?: string;
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const PriceChart = ({ data, title, value, change, color }: PriceChartProps) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("Max");

  const { theme } = useTheme();

  const font = useFont(require("@/assets/fonts/Inter/Inter-Regular.ttf"), 11);

  const { state, isActive } = useChartPressState({ x: "", y: { price: 0 } });

  const isNegative = change.startsWith("-");

  const lineColor = color || theme.primary.DEFAULT;

  const animatedText = useAnimatedProps(() => {
    return {
      text: formatNumber({
        value: Number(state.y.price.value.value),
        decimals: 2,
        prefix: "$",
      }),
      defaultValue: "",
    };
  });

  const animatedDate = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);

    return {
      text: date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      defaultValue: "",
    };
  });

  return (
    <View className="gap-4 rounded-xl bg-secondary p-4">
      <View className="gap-4">
        <View className="gap-1">
          <View className="gap-1">
            <Text className="!text-lg !text-base-200">{title}: Crypto</Text>
            {isActive ? (
              <AnimatedTextInput
                className="!font-Inter-Bold !text-3xl !leading-[0]"
                editable={false}
                underlineColorAndroid="transparent"
                animatedProps={animatedText}
              />
            ) : (
              <Text className="!font-Inter-Bold !text-3xl">
                ${formatNumber({ value: Number(value), decimals: 2 })}
              </Text>
            )}
          </View>
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center">
              <Feather
                name={isNegative ? "arrow-down-right" : "arrow-up-right"}
                size={20}
                color={isNegative ? theme.error.DEFAULT : theme.success.DEFAULT}
              />
              <Text
                className={`!text-lg ${isNegative ? "!text-error" : "!text-success"}`}
              >
                {change}%
              </Text>
            </View>
            {isActive ? (
              <AnimatedTextInput
                className="!font-Inter-Medium !text-lg !leading-[0] !text-base-200"
                editable={false}
                underlineColorAndroid="transparent"
                animatedProps={animatedDate}
              />
            ) : null}
          </View>
        </View>
        <View className="flex-row flex-wrap gap-2 rounded-lg border border-neutral-content-700 px-2">
          {TIME_RANGES.map((range) => (
            <Pressable
              key={range}
              onPress={() => setSelectedRange(range)}
              className="p-2"
            >
              <Text
                className={`!text-base ${
                  selectedRange === range
                    ? "!font-Inter-Medium !text-primary"
                    : "!text-base-200"
                }`}
              >
                {range}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="h-80">
        <CartesianChart
          data={data}
          xKey="timestamp"
          yKeys={["price"]}
          chartPressState={state}
          frame={{
            lineWidth: 0,
          }}
          xAxis={{
            lineWidth: 0,
            tickCount: 5,
            font,
            formatXLabel(label) {
              return dayjs(label).format("MM/YY");
            },
            labelColor: theme["base-200"].DEFAULT,
          }}
          yAxis={[
            {
              linePathEffect: <DashPathEffect intervals={[10, 10]} />,
              lineColor: theme["neutral-content"][700],
              font,
              formatYLabel(label) {
                return formatNumber({
                  value: Number(label),
                  decimals: 0,
                  prefix: "$",
                });
              },
            },
          ]}
        >
          {({ points }) => (
            <>
              <Line
                curveType="natural"
                points={points.price}
                color={lineColor}
                strokeWidth={1.5}
              />

              {isActive ? (
                <Tooltip
                  x={state.x.position}
                  y={state.y.price.position}
                  color={lineColor}
                />
              ) : null}
            </>
          )}
        </CartesianChart>
      </View>
    </View>
  );
};

PriceChart.displayName = "PriceChart";

export default PriceChart;
