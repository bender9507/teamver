import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const Container = styled.div`
  position: relative;
  overflow: hidden;

  height: 100%;
`;

export const ChatBox = styled.div`
  overflow: scroll;

  ${flex.column({ gap: 10 })};

  height: 100%;

  padding: 26px 32px 7px 32px;
`;
