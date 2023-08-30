import * as Styled from "./Avatar.styles";
import type { AvatarProps } from "./Avatar.types";

export const Avatar = ({ size, src, shape }: AvatarProps) => {
  return (
    <Styled.AvatarContainer size={size} shape={shape}>
      <Styled.Avatar fill src={src} sizes="100%" alt="프로필 이미지" />
    </Styled.AvatarContainer>
  );
};
