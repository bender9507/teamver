import { useTheme } from "@emotion/react";
import type { TextareaHTMLAttributes } from "react";
import { forwardRef, useEffect, useRef } from "react";
import { useMount } from "react-use";
import * as Styled from "./Textarea.styles";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ onInvalid, ...props }, ref) => {
  const { sizes } = useTheme();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${sizes.height.medium}px`;
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
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
