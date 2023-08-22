import type { InputHTMLAttributes } from "react";

export interface ImageUploaderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (imageFile: File) => void;
}
