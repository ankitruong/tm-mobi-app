import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ChatSourcesItem, {
  Source,
} from "../../../src/components/chats/ChatSourcesItem";

const meta = {
  title: "Chats/ChatSourcesItem",
  component: ChatSourcesItem,
  argTypes: {
    onPress: { action: "source item pressed" },
  },
  args: {
    item: {
      title: "Sample Source",
      source: "https://example.com",
      imageUrl: "https://via.placeholder.com/24",
    } as Source,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ChatSourcesItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
