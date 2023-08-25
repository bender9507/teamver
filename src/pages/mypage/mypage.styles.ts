import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";

export const Container = styled.div`
  ${flex.column({ gap: 15, align: "center" })};

  ${size({ width: "100%", minHeight: "100vh" })};
  margin: 0 auto;
  padding-top: 15px;
`;

export const ProceedingProjectContainer = styled.div`
  ${flex.column({ align: "start", gap: 10 })}

  ${size({ width: "100%" })}

  padding: 0 15px;
`;

export const PreviousProjectContainer = styled.div`
  ${flex.column({ align: "start", gap: 10 })}

  ${size({ width: "100%" })}
  
  padding: 0 15px;
`;
