import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Text from "../../../src/components/texts/Text";

const meta: Meta<typeof Text> = {
  title: "Texts/Text",
  component: Text,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Sample Text",
  },
};
