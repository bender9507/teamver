import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, grid, size } from "~/styles/mixins";

export const Container = styled.div`
  ${flex.column({ gap: 15, align: "center" })};

  ${size({ width: "100%", maxWidth: 375, minHeight: "100vh" })};

  ${({theme: {colors}}) => css`
    margin: 0 auto;
    padding: 10px;
    border: 1px solid ${colors.black};
  `}
`

export const TitleContainer = styled.div`
  ${grid({column: 3, align: 'center', autoColumnSize: false})};

  ${size({ width: '100%'})};

  margin: 20px 0;
  
`

export const MemberCardContainer = styled.div`
  ${flex.column({gap:10})}
  
  ${size({width: '100%'})}
`

export const MemberCard = styled.div`
  ${flex({gap: 10, justify: 'start', align: 'center'})};

  ${size({ width: '100%'})};

  
`