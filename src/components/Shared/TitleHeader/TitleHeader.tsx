import { PreviousButton } from "~/components/Commons";
import { PosCenter, Text } from "~/styles/mixins";
import * as Styled from "./TitleHeader.styles";

export const TitleHeader = ({ title }: { title: string }) => {
  return (
    <Styled.TitleHeader>
      <PreviousButton />

      <PosCenter>
        <Text size="titleSmall">{title}</Text>
      </PosCenter>
    </Styled.TitleHeader>
  );
};
