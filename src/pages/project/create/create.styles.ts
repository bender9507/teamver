import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { Input } from "~/components/Commons";
import { Text, flex, grid, size } from "~/styles/mixins";
import { colors } from "~/styles/theme/colors";

export const Header = styled.header`
  ${grid({ column: 3, justify: "center", align: "center" })}

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;

export const Desc = styled(Text)`
  margin-left: 18px;
`;

export const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;

  ${size({ width: 100, height: 140 })};

  ${({ theme: { colors } }) => css`
    background-color: ${colors.backgroundSecondary};

    border-radius: 20px;
  `}
`;

export const ImagePreview = styled(Image)`
  object-fit: cover;
  object-position: center;
`;

export const ImageUploadBox = styled.div`
  ${flex.center()};

  ${size({ width: "100%", height: "100%" })};

  ${({ theme: { colors } }) => css`
    border: 1px dashed ${colors.gray4};
    border-radius: 20px;
  `}
`;

export const ImageUploadButton = styled.div`
  ${flex.center()};

  ${size({ width: 44, height: 44 })};

  ${({ theme: { colors } }) => css`
    background-color: ${colors.black};
  `}

  border-radius: 50%;
`;

export const Checkbox = styled(Input)`
  ${size({ width: 18, height: 18 })};

  ${(props) =>
    props.checked
      ? css`
          background-color: ${colors.primary};
        `
      : css`
          background-color: ${colors.gray2};
        `}

  padding: 0%;
  margin-left: 8px;

  border: none;
  border-radius: 5px;
`;

export const CalendarWrapper = styled.div`
  ${flex.column({ align: "center" })};

  padding: 15px 0;

  .react-calendar {
    ${flex.column({ align: "center" })};

    ${size({ width: "85%" })};

    ${({ theme: { colors } }) => css`
      background-color: ${colors.black};
    `}
    border: none;
  }

  .react-calendar__navigation__label > span {
    ${({ theme: { colors } }) => css`
      color: ${colors.white};
    `}

    padding: 0 15px;

    font-size: 1rem;
  }
  .react-calendar__navigation button {
    padding: 0 20px;

    ${({ theme: { colors } }) => css`
      color: ${colors.white};
    `};
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    ${({ theme: { colors } }) => css`
      background-color: ${colors.black};
    `}
  }
  .react-calendar__month-view__weekdays__weekday {
    ${flex({ justify: "center" })};

    width: 100%;

    padding-bottom: 10px;

    font-size: 0.8rem;

    abbr[title] {
      text-decoration: none;
    }
  }

  .react-calendar__month-view__weekdays {
    abbr {
      ${({ theme: { colors } }) => css`
        color: ${colors.gray7};
      `}

      font-weight: 300;
    }
  }
  .react-calendar__month-view__days {
    height: 120%;
  }
  .react-calendar__tile--now {
    ${({ theme: { colors } }) => css`
      background-color: ${colors.black};
    `}
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    ${({ theme: { colors } }) => css`
      color: ${colors.black};
    `}
  }
  .react-calendar__tile {
    ${({ theme: { colors } }) => css`
      color: ${colors.gray6};
      background-color: ${colors.black};
    `}
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    ${({ theme: { colors } }) => css`
      color: ${colors.black};
      background-color: ${colors.primary};
    `}
    border-radius: 10px;
  }
`;
