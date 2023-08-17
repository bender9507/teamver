import { css } from "@emotion/react";

export const more = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    letter-spacing: -0.05em;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::before,
    &::after {
      box-sizing: border-box;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  img {
    border: 0;
  }

  a {
    text-decoration: none;
  }

  input,
  button {
    -webkit-appearance: none;
  }

  input::-webkit-contacts-auto-fill-button {
    position: absolute;
    right: 0;
    display: none !important;
    pointer-events: none;
    visibility: hidden;
  }

  input {
    background-color: transparent;
    background-image: none !important;
    border: 0;
  }

  button {
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: 0;

    &:disabled {
      cursor: not-allowed;
    }
  }

  input:is([type="button"], [type="submit"], [type="reset"]),
  input[type="file"]::file-selector-button,
  button {
    color: initial;
  }

  input[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }
  }
`;
