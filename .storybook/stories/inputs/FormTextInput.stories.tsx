import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormTextInput from "../../../src/components/inputs/FormTextInput";

const meta = {
  title: "Inputs/FormTextInput",
  component: FormTextInput,
  args: {
    label: "Username",
    size: "md",
    variant: "primary",
    caption: "Enter your username",
    errorMessage: "",
    shape: "rounded",
    required: false,
    name: "username",
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof FormTextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <FormTextInput {...args} control={methods.control} />
      </FormProvider>
    );
  },
};
