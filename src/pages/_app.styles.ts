import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  overflow: hidden;

  width: 100%;
  max-width: 500px;

  height: calc(var(--vh, 1vh) * 100);
  min-height: calc(var(--vh, 1vh) * 100);
  max-height: calc(var(--vh, 1vh) * 100);

  margin: 0 auto;
`;
