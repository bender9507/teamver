import type { PropsWithChildren } from "react";
import { forwardRef } from "react";
import type { WithStyle } from "~/types";
import { imageExtensions } from "./ImageUploader.constants";
import { useImageUploader } from "./ImageUploader.hooks";
import * as Styled from "./ImageUploader.styles";
import type { ImageUploaderProps } from "./ImageUploader.types";

export const ImageUploader = forwardRef<
  HTMLInputElement,
  PropsWithChildren<ImageUploaderProps & WithStyle>
>(({ children, style, ...props }, ref) => {
  const { handleFileChange } = useImageUploader(props);

  return (
    <Styled.Container htmlFor={props.name} style={style}>
      {children}

      <input
        {...props}
        id={props.name}
        ref={ref}
        type="file"
        hidden
        accept={imageExtensions.join(",")}
        onChange={handleFileChange}
      />
    </Styled.Container>
  );
});
