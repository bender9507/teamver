import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { Flex, type FlexProps } from "~/styles/mixins";
import type { RadioGroupProps } from "./RadioGroup.types";

export const RadioGroupContext = createContext<Omit<RadioGroupProps, "containerProps">>({});

export const RadioGroup = ({
  children,
  containerProps,
  ...props
}: PropsWithChildren<RadioGroupProps> & FlexProps) => {
  return (
    <RadioGroupContext.Provider value={props}>
      <Flex {...containerProps}>{children}</Flex>
    </RadioGroupContext.Provider>
  );
};

export const useRadioGroup = () => {
  const radioContext = useContext(RadioGroupContext);

  return radioContext;
};
