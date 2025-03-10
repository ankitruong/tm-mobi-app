import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import DrawerUserCard from "../../../src/components/cards/DrawerUserCard";

const meta = {
  title: "Cards/DrawerUserCard",
  component: DrawerUserCard,
  args: {
    onPress: () => {},
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof DrawerUserCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPress: () => {},
  },
};
