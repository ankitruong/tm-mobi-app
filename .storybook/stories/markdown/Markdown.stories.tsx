import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ScrollView } from "react-native";
import Markdown from "../../../src/components/markdown/Markdown";
import { MOCK_MARKDOWN_CONTENT } from "../../../src/store/constants/mocks";

const meta = {
  title: "Markdown/Markdown",
  component: Markdown,
  args: {
    children: MOCK_MARKDOWN_CONTENT,
  },
  decorators: [
    (Story) => (
      <ScrollView style={{ flex: 1 }}>
        <Story />
      </ScrollView>
    ),
  ],
} satisfies Meta<typeof Markdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
