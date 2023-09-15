import { IconButton, PreviousButton } from "~/components/Commons";
import { PosCenter, Text } from "~/styles/mixins";
import * as Styled from "./TitleHeader.styles";

export const TitleHeader = ({
  title,
  onPrevious,
  onDelete,
  state,
  hideBackButton
}: {
  title: string;
  onPrevious?: () => Promise<boolean>;
  onDelete?: () => void;
  state?: boolean;
  hideBackButton?: boolean;
}) => {
  return (
    <Styled.TitleHeader>
      {!hideBackButton && <PreviousButton onPrevious={onPrevious} />}

      <PosCenter>
        <Text size="titleSmall">{title}</Text>
      </PosCenter>

      {onDelete &&
        (state ? (
          <Text onClick={onDelete}>완료</Text>
        ) : (
          <IconButton name="delete" onClick={onDelete} />
        ))}
    </Styled.TitleHeader>
  );
};
