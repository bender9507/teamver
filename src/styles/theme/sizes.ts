export const SIZE_KEY_LIST = ["small", "medium", "large"] as const;

export const sizes = {
  height: {
    small: 34,
    medium: 43,
    large: 55,
    header: 60,
    navbar: 60
  } as const,
  padding: {
    small: 8,
    medium: 12,
    large: 18
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
  } as const,
  button: {
    small: "buttonSmall",
    medium: "buttonSmall",
    large: "buttonMedium"
  }
} as const;
