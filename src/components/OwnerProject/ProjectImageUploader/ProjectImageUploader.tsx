import type { ComponentProps } from "react";
import { Icon, ImageUploader } from "~/components/Commons";

import { useProjectImageUploader } from "./ProjectImageUploader.hooks";
import * as Styled from "./ProjectImageUploader.styles";

export const ProjectImageUploader = (props: ComponentProps<typeof ImageUploader>) => {
  const app = useProjectImageUploader(props);

  return (
    <ImageUploader {...props} onChange={app.onChange}>
      <Styled.Container>
        {app.previewUrl ? (
          <Styled.ProfilePreview src={app.previewUrl} alt="프로필 사진" fill sizes="100%" />
        ) : (
          <Styled.UploadButton>
            <Icon name="close" width={40} height={40} color="white" />
          </Styled.UploadButton>
        )}
      </Styled.Container>
    </ImageUploader>
  );
};
