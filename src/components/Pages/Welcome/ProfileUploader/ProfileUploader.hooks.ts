import { useState, type ComponentProps } from "react";
import type { ProfileUploader } from ".";

export const useProfileUploader = ({ onChange }: ComponentProps<typeof ProfileUploader>) => {
  const [previewUrl, setPreviewUrl] = useState("");

  const _onChange = (image: File) => {
    const imageUrl = URL.createObjectURL(image);

    setPreviewUrl(imageUrl);

    if (onChange) onChange(image);
  };

  return { previewUrl, onChange: _onChange };
};
