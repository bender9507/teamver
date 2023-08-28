import { Button } from "~/components/Commons";
import type { ProjectDataRow } from "~/states/server/project";
import { Flex, FlexColumn } from "~/styles/mixins";
import { useCard } from "./Card.hooks";
import * as Styled from "./Card.styles";

export const Card = (project: ProjectDataRow) => {
  const app = useCard(project);
  console.log(app);
  return (
    <Flex gap={18}>
      <div>
        <Styled.Image src={app.project.imageUrl} alt="Project Image" />
      </div>
      <FlexColumn justify="around">
        <div>{app.project.name}</div>
        <Button style={{ borderRadius: "10px", height: "25px" }}>팀원보기</Button>
      </FlexColumn>
    </Flex>
  );
};
