import { useTranslation } from "next-i18next";
import { Avatar, IconButton, ProfileDetail } from "~/components/Commons";
import { NavbarLayout } from "~/components/Layouts";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "../ProjectMembers.styles";
import type { ProjectMembersProps } from "../ProjectMembers.types";
import { PROFILE_DETAIL_MEMBER } from "./Member.constant";
import { useProjectMembers } from "./Member.hooks";

export const Member = ({ projectId }: ProjectMembersProps) => {
  const { t } = useTranslation("projectMembers");
  const app = useProjectMembers(projectId);

  return (
    <NavbarLayout>
      <Styled.Header>
        <IconButton type="button" name="arrowBack" color="content1" onClick={app.handleBack} />

        <Text as="h3" size="heading3">
          {t("프로젝트 팀원")}
        </Text>
      </Styled.Header>

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

            <Text>{member.name}</Text>
          </FlexCenter>
        ))}
      </Styled.MembersContainer>
    </NavbarLayout>
  );
};
