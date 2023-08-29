import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const ProjectListWrapper = styled.div`
  ${flex.column({ gap: 25 })}

  max-height: 160px;

  overflow-y: scroll;
`;
export const ProjectListBox = styled.div`
  ${flex({ align: "center", gap: 12 })}

  cursor: pointer;
`;

export const ButtonBox = styled.div`
  ${flex({ align: "center", gap: 12 })}

  cursor: pointer;
`;
