import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ChatSources from "../../../src/components/chats/ChatSources";
import { Source } from "../../../src/components/chats/ChatSourcesItem";

const meta = {
  title: "Chats/ChatSources",
  component: ChatSources,
  argTypes: {
    onSourcePress: { action: "source pressed" },
  },
  args: {
    sources: [
      {
        title: "Source 1",
        source: "https://example.com/1",
        imageUrl: "https://via.placeholder.com/24",
      },
      {
        title: "Source 2",
        source: "https://example.com/2",
        imageUrl: "https://via.placeholder.com/24",
      },
    ] as Source[],
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ChatSources>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
