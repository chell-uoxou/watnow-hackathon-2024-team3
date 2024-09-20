import React from "react";
import { Input, InputProps } from "../ui/input";
import { WithLabel } from "./WithLabel";

interface InputWithLabelProps extends InputProps {
  label: string;
}

export const InputWithLabel = (props: InputWithLabelProps) => {
  const { label, ...rest } = props;

  return (
    <WithLabel label={label}>
      <Input {...rest} />
    </WithLabel>
  );
};
