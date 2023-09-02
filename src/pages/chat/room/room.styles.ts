import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, flex, text } from "~/styles/mixins";
import { styleHelper } from "~/styles/utils";

export const ChatHeader = styled.header`
  ${flex({ align: "center", justify: "between", gap: 15 })};

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `};

  padding: 0 22px;
`;

export const ChatInputBox = styled.form`
  ${flex({ justify: "between", align: "center", gap: 10 })};

  padding: 7px 16px 20px 16px;
`;

export const MessageContainer = styled.div<{ isMine: boolean }>`
  ${flex({ gap: 6 })};

  ${({ isMine }) =>
    isMine &&
    css`
      ${styleHelper("alignSelf", "flex-end")};
      ${styleHelper("flexDirection", "row-reverse")}
    `}
`;

export const MessageBox = styled(Flex)<{ isMine: boolean }>`
  ${flex({ align: "end", gap: 11 })}

  ${({ isMine }) =>
    isMine &&
    css`
      ${styleHelper("flexDirection", "row-reverse")}
    `}
`;

export const Bubble = styled.div<{ isMine: boolean }>`
  padding: 12px 16px;

  ${({ theme: { colors }, isMine }) => css`
    border: 1px solid ${colors.backgroundSecondary};
    border-radius: 16px;

    ${text("textMedium")};
    color: ${colors.content1};

    ${isMine &&
    css`
      background-color: ${colors.backgroundSecondary};

      border: none;
    `}
  `}
`;

// export const ChatRoomWrapper = styled.div`
//   position: relative;

//   ${flex.column()}
// `;

// export const ChatRoomTopBar = styled.section`
//   ${flex({ align: "center", justify: "between" })}

//   height: 55px;
// `;

// export const ChatMessageWrapper = styled.div`
//   ${flex.column({ gap: 10 })}

//   height: calc(100vh - 110px);

//   overflow-y: scroll;
// `;

// export const ChatFromWrapper = styled.form`
//   position: absolute;

//   bottom: 0;

//   ${flex.center()}

//   width: 100%;
// `;

// export const ChatMessageRight = styled.div`
//   ${flex({ align: "center", justify: "end", gap: 16 })}

//   ${({ theme: { colors } }) => css`
//     color: ${colors.white};
//   `}
// `;

// export const ChatMessageLeft = styled.div`
//   ${({ theme: { colors } }) => css`
//     text-align: left;

//     color: ${colors.white};
//   `}
// `;

// export const NoMessageBox = styled.div`
//   ${flex.center({ direction: "column", gap: 24 })}

//   height: 80%
// `;
