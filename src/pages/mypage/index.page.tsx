import { useTranslation } from "next-i18next";
import Head from "next/head";
import { Button } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import * as Styled from "./mypage.styles";

function MyPage() {
  const { t } = useTranslation("mypage");
  return (
    <>
      <Head>
        <title>{t("마이페이지")}</title>
      </Head>

      <Styled.Container>
        <Text>big size Avatar</Text>
        <Button>{t("포지션 수정")}</Button>
        <Styled.LikeUsersButtonContainer>
          <Text>나를 찜한 사용자 n명</Text>
          <Text>화살표버튼</Text>
        </Styled.LikeUsersButtonContainer>
        <Styled.ProceedingProjectContainer>
          <Text as="h3" size="heading3">
            진행중인 프로젝트
          </Text>
          <Styled.ProceedingProjectCard>
            <Text>프로젝트 제목1</Text>
            <Flex gap={5}>
              <Button>정보</Button>
              <Button>멤버</Button>
            </Flex>
          </Styled.ProceedingProjectCard>
        </Styled.ProceedingProjectContainer>
        <Styled.ReceivedRecommendContainer>
          <Text as="h3" size="heading3">
            받은 추천 n
          </Text>
          <Styled.RecommendCard>
            <Flex gap={10}>
              <Text>middle size Avatar</Text>
              <FlexColumn>
                <Text>오너아이디</Text>
                <Text>프로젝트 참여</Text>
              </FlexColumn>
            </Flex>
            <Text>gdgdgdgdgd</Text>
          </Styled.RecommendCard>
        </Styled.ReceivedRecommendContainer>
        <Styled.PreviousProjectContainer>
          <Text as="h3" size="heading3">
            지난 프로젝트
          </Text>
          <Styled.PreviousProjectCard>
            <Text>프로젝트 항목1</Text>
            <Button>멤버 후기 쓰기</Button>
          </Styled.PreviousProjectCard>
        </Styled.PreviousProjectContainer>
      </Styled.Container>
    </>
  );
}

export default MyPage;
