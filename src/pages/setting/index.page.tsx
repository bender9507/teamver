import Cookies from "js-cookie";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { Radio, RadioGroup, useModal } from "~/components/Commons";
import { TitleHeader } from "~/components/Shared";
import { routes } from "~/constants/routes";
import { FlexColumn, LayoutContent, LayoutHeader, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import * as Styled from "./setting.styles";

const ProfileSetting = () => {
  const router = useRouter();
  const { mount } = useModal();
  const { t, i18n } = useTranslation("setting");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <LayoutHeader>
      <TitleHeader title={t("설정")} />

      <LayoutContent>
        <FlexColumn>
          <Styled.Option
            hasBorder
            onClick={() =>
              mount(
                <Styled.LanguageContainer>
                  <Text size="buttonLarge">{t("언어 설정")}</Text>

                  <RadioGroup
                    name="language"
                    defaultChecked={currentLanguage}
                    onChange={(event) => {
                      const language = event.target.value as OneOfLanguage;

                      Cookies.set("locale", language);

                      router.replace(router.pathname, router.pathname, { locale: language });
                    }}
                    containerProps={{ direction: "column", gap: 24 }}
                  >
                    <Radio value="ko">{t("한국어")}</Radio>
                    <Radio value="en">{t("영어")}</Radio>
                    <Radio value="jp">{t("일본어")}</Radio>
                  </RadioGroup>
                </Styled.LanguageContainer>,
                { id: "changeLanguage" }
              )
            }
          >
            {t("언어 설정")}
          </Styled.Option>

          <Link href={routes.role}>
            <Styled.Option>{t("참여 모드 설정")}</Styled.Option>
          </Link>
        </FlexColumn>
      </LayoutContent>
    </LayoutHeader>
  );
};

export default ProfileSetting;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["setting"]))
    }
  };
};
