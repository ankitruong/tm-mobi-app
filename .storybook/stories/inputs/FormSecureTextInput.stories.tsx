import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormSecureTextInput from "../../../src/components/inputs/FormSecureTextInput";

const meta = {
  title: "Inputs/FormSecureTextInput",
  component: FormSecureTextInput,
  args: {
    label: "Password",
    size: "md",
    variant: "primary",
    caption: "Enter your password",
    errorMessage: "",
    shape: "rounded",
    required: false,
    name: "password",
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof FormSecureTextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <FormSecureTextInput {...args} control={methods.control} />
      </FormProvider>
    );
  },
};
