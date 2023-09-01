import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Sheet from "react-modal-sheet";
import { flex, position, size } from "~/styles/mixins";

export const StyleSheet = styled(Sheet)`
  ${({ theme: { colors } }) => css`
    position: absolute !important;

    .react-modal-sheet-container {
      overflow: hidden;

      margin: 0 auto;

      border-radius: 27px 27px 0 0;
    }

    .react-modal-sheet-content {
      background-color: ${colors.backgroundSecondary};
    }

    .react-modal-sheet-backdrop {
      position: absolute !important;
    }
  `}
`;

export const SheetHeader = styled.div`
  ${position.absolute({ left: 0, top: 0 })};
  z-index: 1;

  ${flex.center()};

  ${size({ width: "100%", height: 13 })};

  &::after {
    content: "";

    ${size({ minWidth: 134, minHeight: 5 })};

    ${({ theme: { colors } }) => css`
      background-color: ${colors.gray6};
    `};

    border-radius: 16px;
  }
`;
