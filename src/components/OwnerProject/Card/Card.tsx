import { Button, IconButton, useModal } from "~/components/Commons";
import type { ProjectAllDataRow } from "~/states/server/project";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { CARD_MODAL } from "./Card.constants";
import { useCard } from "./Card.hooks";
import * as Styled from "./Card.styles";

export const Card = (project: ProjectAllDataRow) => {
  const app = useCard(project);
  const { mount } = useModal();

  return (
    <Flex justify="between">
      <Flex gap={18}>
        <div>
          <Styled.Image src={app.project.imageUrl} alt="Project Image" />
        </div>
        <FlexColumn justify="around">
          <Text>{app.project.name}</Text>
          <Flex>
            <Button>팀원보기</Button>
          </Flex>
        </FlexColumn>
      </Flex>

      <FlexColumn justify="center">
        <IconButton
          name="more"
          width={28}
          height={28}
          onClick={() => {
            if (app.project.state === "IN_RECRUIT") {
              mount(
                <FlexColumn gap={26} align="center" style={{ padding: "30px 0" }}>
                  <Text onClick={app.handleToEditForm}>프로젝트 수정</Text>
                  <Text onClick={() => app.handleUpdateProject("DONE_RECRUIT")}>
                    팀원 모집 마감
                  </Text>
                  <Text onClick={() => app.handleUpdateProject("DONE_PROJECT")}>
                    진행상태 완료로 변경
                  </Text>
                  <Text onClick={app.handleDeleteProject}>프로젝트 삭제</Text>
                </FlexColumn>,
                {
                  id: CARD_MODAL,
                  type: "bottom"
                }
              );
            } else if (app.project.state === "DONE_RECRUIT") {
              mount(
                <FlexColumn gap={26} align="center" style={{ padding: "30px 0" }}>
                  <Text onClick={app.handleToEditForm}>프로젝트 수정</Text>
                  <Text onClick={() => app.handleUpdateProject("IN_RECRUIT")}>팀원 모집 받기</Text>
                  <Text onClick={() => app.handleUpdateProject("DONE_PROJECT")}>
                    진행상태 완료로 변경
                  </Text>
                  <Text onClick={app.handleDeleteProject}>프로젝트 삭제</Text>
                </FlexColumn>,
                { id: "CARD_MODAL", type: "bottom" }
              );
            } else if (app.project.state === "DONE_PROJECT") {
              mount(
                <FlexColumn gap={26} align="center" style={{ padding: "30px 0" }}>
                  <Text onClick={app.handleDeleteProject}>프로젝트 삭제</Text>{" "}
                </FlexColumn>,
                {
                  id: "CARD_MODAL",
                  type: "bottom"
                }
              );
            }
          }}
        />
      </FlexColumn>
    </Flex>
  );
};
