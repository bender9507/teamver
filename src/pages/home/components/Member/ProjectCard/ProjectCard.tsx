import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { memo } from "react";
import {
  IconButton,
  PROJECT_DETAIL_MODAL,
  ProjectDetail,
  TinderCard,
  useModal
} from "~/components/Commons";
import { useSelectProfileQuery } from "~/states/server/profile";
import type { ProjectAllDataRow } from "~/states/server/project";
import { Flex, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { BlurChip, CardContainer, Content, Gradient, Profile } from "../../Home.styles";

export const ProjectCard = memo(
  ({
    onAccept,
    onReject,
    onRestore,
    project
  }: {
    onAccept: VoidFunction;
    onReject: VoidFunction;
    onRestore: VoidFunction;
    project: ProjectAllDataRow;
  }) => {
    const user = useUser() as User;
    const { data: profile } = useSelectProfileQuery(user.id);
    const { mount } = useModal();
    const { i18n } = useTranslation("home");

    const currentLanguage = i18n.language as OneOfLanguage;

    return (
      <CardContainer>
        <TinderCard onConfirm={onAccept} onCancel={onReject} onRestore={onRestore}>
          <Profile src={project.imageUrl} alt="프로필 사진" fill sizes="100%" priority />

          <Gradient />

          <Content>
            <Flex>
              <BlurChip>{project.projectType[currentLanguage]}</BlurChip>
            </Flex>

            <Text size="titleMedium">{project.name}</Text>

            <Flex align="end" justify="between" gap={12}>
              <Text size="textSmallBold" color="gray9" lineClamp={2} lineHeight={19}>
                {project.description}
              </Text>

              <IconButton
                name="upButton"
                width={26}
                height={26}
                color="white"
                onClick={() =>
                  mount(<ProjectDetail project={project} profile={profile} />, {
                    id: PROJECT_DETAIL_MODAL,
                    type: "bottom"
                  })
                }
                style={{ flexShrink: 0 }}
              />
            </Flex>
          </Content>
        </TinderCard>
      </CardContainer>
    );
  }
);
