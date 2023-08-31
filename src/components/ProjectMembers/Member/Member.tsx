import { useTranslation } from "next-i18next";
import type { ComponentProps } from "react";
import { Avatar, IconButton, ProfileDetail } from "~/components/Commons";
import type ProjectMembers from "~/pages/project/members/[projectId]/index.page";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "../ProjectMembers.styles";
import { PROFILE_DETAIL_MEMBER } from "./Member.constant";
import { useProjectMembers } from "./Member.hooks";

export const Member = (props: ComponentProps<typeof ProjectMembers>) => {
  const { t } = useTranslation("projectMembers");
  const app = useProjectMembers(props);

  return (
    <>
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
    </>
  );
};
