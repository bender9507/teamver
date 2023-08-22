import { useTranslation } from "next-i18next";
import type { ChangeEvent, ComponentProps } from "react";
import type { ImageUploader } from "..";
import { useDialog } from "..";
import { imageExtensions } from "./ImageUploader.constants";

export const useImageUploader = ({ onChange }: ComponentProps<typeof ImageUploader>) => {
  const { toast } = useDialog();
  const { t } = useTranslation("common");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;

    const isValidFileType = imageExtensions.includes(files[0].type);

    if (!isValidFileType) {
      toast({ message: t("이미지만 업로드할 수 있습니다.") });
      return;
    }

    if (onChange) onChange(files[0]);
  };

  return { handleFileChange };
};
