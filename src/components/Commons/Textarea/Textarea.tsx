import { useTheme } from "@emotion/react";
import type { TextareaHTMLAttributes } from "react";
import { forwardRef, useEffect, useRef } from "react";
import { useMount } from "react-use";
import * as Styled from "./Textarea.styles";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  { maxHeight?: number } & TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ onInvalid, maxHeight, ...props }, ref) => {
  const { sizes } = useTheme();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${sizes.height.medium}px`;

      let height = textareaRef.current.scrollHeight + 2;

      if (maxHeight && maxHeight < height) {
        height = maxHeight;
      }

      textareaRef.current.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(textareaRef.current);
      } else if ("current" in ref) {
        // eslint-disable-next-line no-param-reassign
        ref.current = textareaRef.current;
      }
    }
  }, [ref]);

  useMount(() => {
    resize();
  });

  return (
    <Styled.Textarea
      ref={textareaRef}
      {...props}
      onInvalid={(event) => {
        event.preventDefault();
        if (onInvalid) onInvalid(event);
      }}
      onInput={resize}
    />
  );
});
