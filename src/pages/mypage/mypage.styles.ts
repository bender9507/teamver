import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";

export const Container = styled.div`
  ${flex.column({ gap: 15, align: "center" })};

  ${size({ width: "100%", maxWidth: 375, minHeight: "100vh" })};

  ${({theme: {colors}}) => css`
    margin: 0 auto;
    border: 1px solid ${colors.black};
  `}
`;

export const LikeUsersButtonContainer = styled.div`
  ${flex({ justify: "start" })};

  ${size({ width: "100%" })};

  ${({theme: {colors}}) => css`
    padding: 15px;
    background-color: ${colors.border};
  `}
`;

export const ProceedingProjectContainer = styled.div`
  ${flex.column({ align: "start", gap: 10 })}

  ${size({ width: "100%" })}

  padding: 0 15px;
`;


export const ReceivedRecommendContainer = styled.div`
  ${flex.column({ align: "start", gap: 10 })}

  ${size({ width: "100%" })}

  padding: 0 15px;
`;

export const RecommendCard = styled.div`
  ${flex.column({ align: "start", gap: 10 })}

  ${size({ width: "100%" })}

  ${({theme: {colors}}) => css`
    padding: 10px;
    background-color: ${colors.border};
  `}
`;

export const PreviousProjectContainer = styled.div`
  ${flex.column({ align: "start", gap: 10 })}

  ${size({ width: "100%" })}
  
  padding: 0 15px;
`;
