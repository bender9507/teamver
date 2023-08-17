export const SIZE_KEY_LIST = ["small", "medium", "large"] as const;

export const sizes = {
  height: {
    small: 28,
    medium: 40,
    large: 52
  } as const,
  padding: {
    small: 8,
    medium: 12,
    large: 16
  } as const,
  heading: {
    small: "heading6",
    medium: "heading5",
    large: "heading4"
  } as const,
  paragraph: {
    small: "paragraph3",
    medium: "paragraph2",
    large: "paragraph1"
  } as const
} as const;
