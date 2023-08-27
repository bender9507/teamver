import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const Container = styled.div`
  ${flex.column({ gap: 20, justify: "center", align: "start" })}
`;

export const InfoContainer = styled.div`
  ${flex.column({ gap: 5 })}
`;

export const ChipsContainer = styled.div`
  ${flex({ gap: 10, wrap: "wrap" })}
`;
