import styled from "@emotion/styled";
import { Text, flex, grid, size } from "~/styles/mixins";

export const Container = styled.div`
  ${flex.column({ gap: 15, align: "center" })};

  ${size({ width: "100%", minHeight: "100vh" })};
  margin: 0 auto;
  padding-top: 15px;
`;

export const ProjectContainer = styled.div`
  ${flex.column({ align: "start", gap: 10 })}

  ${size({ width: "100%" })}

  padding: 0 15px;
`;

export const TabButtonContainer = styled.div`
  ${grid({ column: 2, autoColumnSize: false })}
  width: 100%;
  border-bottom: 1px solid gray;
  position: relative;

  .submenu {
    padding: 10px;
    color: gray;
  }

  .clicked {
    padding: 10px;
    color: white;
  }
`;

export const SelectedBorder = styled(Text)`
  position: absolute;
  width: 50%;
  height: 3px;
  background-color: white;
  bottom: calc(0% - 2px);
  transition: 0.2s transform;
  transform: ${({ tabState }: { tabState: number }) => `translateX(${tabState * 100}%)`};
`;
