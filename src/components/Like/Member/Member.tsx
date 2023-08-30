import { Avatar, Button, IconButton, ProjectDetail } from "~/components/Commons";
import { NavbarLayout } from "~/components/Layouts";
import { FlexCenter, FlexColumn, Text } from "~/styles/mixins";
import * as Styled from "../Like.styles";
import { useMember } from "./Member.hooks";

export const Member = ({ userId }: { userId: string }) => {
  const app = useMember(userId);

  return (
    <NavbarLayout>
      <FlexColumn style={{ padding: "20px" }}>
        <Styled.Header>
          <IconButton type="button" name="arrowBack" color="content1" onClick={app.handleBack} />

          <Text style={{ margin: "0 auto" }} as="h3" size="heading3">
            찜 목록
          </Text>
        </Styled.Header>

        <Text as="h4" size="heading4" style={{ margin: "40px 0 20px 0" }}>
          내가 찜한 프로젝트
        </Text>

        <FlexColumn gap={15}>
          {app.followProjects.map((followProject) => (
            <Styled.Card key={followProject.id}>
              <FlexCenter
                as="button"
                gap={10}
                onClick={() =>
                  app.mount(
                    <ProjectDetail
                      profile={app.profile}
                      project={followProject.project}
                      key={followProject.project.id}
                    />,
                    { type: "bottom", id: "LIKE_MEMBER" }
                  )
                }
              >
                <Avatar src={followProject.project.imageUrl} size="medium" />
                <Text>{followProject.project.name}</Text>
              </FlexCenter>

              <FlexCenter gap={10}>
                <Button size="small">채팅 요청</Button>
                <IconButton type="button" name="bookmark" color="content1" />
              </FlexCenter>
            </Styled.Card>
          ))}
        </FlexColumn>
      </FlexColumn>
    </NavbarLayout>
  );
};
