import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { FlexColumn, flex, position, size } from "~/styles/mixins";

export const Header = styled.header`
  ${flex.center()};

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;
export const ProfileBox = styled.div`
  ${flex.column({ align: "center", gap: 12 })};
`;
export const ProfileImage = styled.img`
  ${size({ width: 64, height: 64 })};

  border-radius: 50%;
`;
export const ProjectContainer = styled(FlexColumn)``;

export const Category = styled.div`
  ${flex.center()};

  width: 50%;
  padding-bottom: 12px;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease-in-out;

  &:hover {
    border-color: white;
  }

  &.active {
    border-color: white;
  }
`;
export const ProjectBox = styled(FlexColumn)`
  padding: 18px 33px;
`;
export const ImageUploadButton = styled.div`
  ${position.fixed({ right: 28, bottom: 28 })};

  ${flex.center()};

  ${size({ width: 44, height: 44 })};

  ${({ theme: { colors } }) => css`
    background-color: ${colors.primary};
  `}

  border-radius: 50%;
`;
