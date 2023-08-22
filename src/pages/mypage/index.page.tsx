import { useTranslation } from "next-i18next";
import Head from "next/head";
import { Button } from "~/components/Commons";
import { Flex, Text } from "~/styles/mixins";
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
        <Flex>
          <Text>나를 찜한 사용자 n명</Text>
          <Text>화살표버튼</Text>
        </Flex>
      </Styled.Container>
    </>
  );
}

export default MyPage;
