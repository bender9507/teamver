import styled from "@emotion/styled";
import { flex, grid, size } from "~/styles/mixins";

export const NoRequestBox = styled.div`
  ${flex.center()}

  margin-top: 290px;
`;

export const ChatRequestTitle = styled.section`
  ${grid({ column: 3, justify: "start", align: "center" })};
  ${size({ width: "100%" })}
`;

export const UserBox = styled.div`
  ${flex({ align: "center", gap: 8 })}

  cursor: pointer;
`;

export const ChatRequestListContainer = styled.section`
  ${flex.column({ gap: 12 })}

  height: 95vh;

  overflow-y: scroll;
`;
