import { useTranslation } from "next-i18next";
import { Avatar, Button, ProfileDetail } from "~/components/Commons";
import { TitleHeader } from "~/components/Shared";
import { FlexCenter, LayoutHeader, Text } from "~/styles/mixins";
import * as Styled from "../ProjectMembers.styles";
import { PROFILE_DETAIL_OWNER } from "./Owner.constants";
import { useProjectMembers } from "./Owner.hooks";

export const Owner = () => {
  const app = useProjectMembers();
  const { t } = useTranslation("project");

  return (
    <LayoutHeader>
      <TitleHeader title={t("프로젝트 팀원")} />

      <Styled.MembersContainer>
        {app.projectMembersData.map((member) => (
          <Styled.MemberCard key={member.id}>
            <FlexCenter
              as="button"
              gap={8}
              onClick={() =>
                app.mount(<ProfileDetail profile={member} filter={app.filteredData} />, {
                  id: PROFILE_DETAIL_OWNER,
                  type: "bottom"
                })
              }
            >
              <Avatar src={member.imageUrl} size="medium" />
              <Text size="textMediumBold">{member.name}</Text>
            </FlexCenter>

            {app.user.id !== member.id && (
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
    </LayoutHeader>
  );
};
