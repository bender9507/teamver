import styled from "@emotion/styled";
import { Layout, flex } from "~/styles/mixins";

export const Container = styled(Layout)`
  ${flex({ direction: "column", justify: "end", padding: "22px" })};
`;
