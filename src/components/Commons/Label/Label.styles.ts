import styled from "@emotion/styled";
import { Text, flex } from "~/styles/mixins";

export const Label = styled.label`
  ${flex.column()};
`;

export const Title = styled(Text)`
  margin-bottom: 16px;
`;

export const Desc = styled(Text)`
  margin-bottom: 16px;
`;

export const ItemDesc = styled(Text)`
  margin-top: 7px;

  padding-left: 18px;
`;
