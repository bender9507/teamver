import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const ProfileContainer = styled.div`
  ${flex.center({ direction: "column", gap: 8 })};

  padding-top: 8px;
  padding-bottom: 16px;
`;
