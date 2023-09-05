import { useTranslation } from "next-i18next";
import { Avatar, Button, ProfileDetail } from "~/components/Commons";
import { FlexCenter, Text } from "~/styles/mixins";
import { PROFILE_DETAIL_MEMBERS } from "./ProjectMemberList.constants";
import { useProjectMemberList } from "./ProjectMemberList.hooks";
import * as Styled from "./ProjectMemberList.styles";

export const ProjectMemberList = () => {
  const app = useProjectMemberList();

  const { t } = useTranslation("project");

  return (
    <Styled.MembersContainer>
      {app.projectMembersData.map((member) => (
        <Styled.MemberCard key={member.id}>
          <FlexCenter
            as="button"
            gap={8}
            onClick={() =>
              app.mount(<ProfileDetail profile={member} filter={app.filteredData} />, {
                id: PROFILE_DETAIL_MEMBERS,
                type: "bottom"
              })
            }
          >
            <Avatar src={member.imageUrl} size="medium" />

            <Text size="textMediumBold">{member.name}</Text>
          </FlexCenter>

          {app.profile.role.id === 1 && app.user.id !== member.id && (
            <Button
              size="small"
              color="white"
              bgColor="backgroundSecondary"
              onClick={() => {
                app.handleDeleteMember({ memberId: member.id, projectId: Number(app.projectId) });
              }}
            >
              {t("삭제")}
            </Button>
          )}
        </Styled.MemberCard>
      ))}
    </Styled.MembersContainer>
  );
};
