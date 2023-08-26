import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { FlexColumn, Text, flex, size } from "~/styles/mixins";

export const Header = styled.header`
  ${flex.center()};

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;

export const Container = styled(FlexColumn)`
  padding: 32px;
`;

export const Desc = styled(Text)`
  margin-left: 18px;
`;

export const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;

  ${size({ width: 100, height: 140 })};

  ${({ theme: { colors } }) => css`
    background-color: ${colors.backgroundSecondary};

    border-radius: 20px;
  `}
`;

export const ImagePreview = styled(Image)`
  object-fit: cover;
  object-position: center;
`;

export const ImageUploadBox = styled.div`
  ${flex.center()};

  ${size({ width: "100%", height: "100%" })};

  ${({ theme: { colors } }) => css`
    border: 1px dashed ${colors.gray4};
    border-radius: 20px;
  `}
`;

export const ImageUploadButton = styled.div`
  ${flex.center()};

  ${size({ width: 44, height: 44 })};

  ${({ theme: { colors } }) => css`
    background-color: ${colors.black};
  `}

  border-radius: 50%;
`;
