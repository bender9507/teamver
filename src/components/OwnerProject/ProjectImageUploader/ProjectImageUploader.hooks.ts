import { useState, type ComponentProps } from "react";
import type { ProjectImageUploader } from ".";

export const useProjectImageUploader = ({
  onChange
}: ComponentProps<typeof ProjectImageUploader>) => {
  const [previewUrl, setPreviewUrl] = useState("");

  const _onChange = (image: File) => {
    const imageUrl = URL.createObjectURL(image);

    setPreviewUrl(imageUrl);
    // console.log(previewUrl);

    if (onChange) onChange(image);
  };

  return { previewUrl, onChange: _onChange };
};
