import { PreviousButton } from "~/components/Commons";
import { PosCenter, Text } from "~/styles/mixins";
import * as Styled from "./TitleHeader.styles";

export const TitleHeader = ({
  title,
  onPrevious
}: {
  title: string;
  onPrevious?: () => Promise<boolean>;
}) => {
  return (
    <Styled.TitleHeader>
      <PreviousButton onPrevious={onPrevious} />

      <PosCenter>
        <Text size="titleSmall">{title}</Text>
      </PosCenter>
    </Styled.TitleHeader>
  );
};
