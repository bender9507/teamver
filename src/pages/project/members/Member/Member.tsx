import { useTranslation } from "next-i18next";
import { Avatar, ProfileDetail } from "~/components/Commons";
import { TitleHeader } from "~/components/Shared";
import { FlexCenter, LayoutHeader, Text } from "~/styles/mixins";
import * as Styled from "../ProjectMembers.styles";
import { PROFILE_DETAIL_MEMBER } from "./Member.constant";
import { useProjectMembers } from "./Member.hooks";

export const Member = () => {
  const { t } = useTranslation("project");
  const app = useProjectMembers();

  return (
    <LayoutHeader>
      <TitleHeader title={t("프로젝트 팀원")} />

      <Styled.MembersContainer>
        {app.projectMembersData.map((member) => (
          <FlexCenter
            as="button"
            gap={10}
            key={member.id}
            onClick={() =>
              app.mount(<ProfileDetail profile={member} filter={app.filteredData} />, {
                id: PROFILE_DETAIL_MEMBER,
                type: "bottom"
              })
            }
          >
            <Avatar src={member.imageUrl} size="medium" />

            <Text size="textMediumBold">{member.name}</Text>
          </FlexCenter>
        ))}
      </Styled.MembersContainer>
    </LayoutHeader>
  );
};
