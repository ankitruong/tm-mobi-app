import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import Button from "../../../src/components/buttons/Button";
import Countdown from "../../../src/components/countdown/Countdown";

const meta: Meta<typeof Countdown> = {
  title: "Countdown/Countdown",
  component: Countdown,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    duration: 60,
    shouldStartOnMount: true,
    children: ({ countdown, isComplete, restart }) => (
      <View>
        <Button
          title={isComplete ? "Restart" : `Countdown: ${countdown}`}
          onPress={() => restart()}
        />
      </View>
    ),
  },
};
