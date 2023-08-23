import { useTranslation } from "next-i18next";
import Head from "next/head";
import { Avatar, PreviousButton } from "~/components/Commons";
import { Text } from "~/styles/mixins";
import * as Styled from "./projectmembers.styles";

function ProjectMembers() {
  const { t } = useTranslation("projects");
  return (
    <>
      <Head>
        <title>{t("멤버")}</title>
      </Head>

      <Styled.Container>
        <Styled.TitleContainer>
          <PreviousButton />
          <Text as="h2" size="paragraph1">
            {t("프로젝트 멤버")}
          </Text>
        </Styled.TitleContainer>

        <Styled.MemberCardContainer>
          <Styled.MemberCard>
            <Avatar src="http://via.placeholder.com/250x250" size="medium" />
            <Text>개발하는 어피치</Text>
          </Styled.MemberCard>
          <Styled.MemberCard>
            <Avatar src="http://via.placeholder.com/250x250" size="medium" />
            <Text>개발하는 어피치</Text>
          </Styled.MemberCard>
        </Styled.MemberCardContainer>
      </Styled.Container>
    </>
  );
}

export default ProjectMembers;
