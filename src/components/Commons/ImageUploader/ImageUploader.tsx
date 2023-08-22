import type { PropsWithChildren } from "react";
import { forwardRef } from "react";
import { imageExtensions } from "./ImageUploader.constants";
import { useImageUploader } from "./ImageUploader.hooks";
import type { ImageUploaderProps } from "./ImageUploader.types";

export const ImageUploader = forwardRef<HTMLInputElement, PropsWithChildren<ImageUploaderProps>>(
  ({ children, ...props }, ref) => {
    const { handleFileChange } = useImageUploader(props);

    return (
      <label htmlFor={props.name}>
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
      </label>
    );
  }
);
