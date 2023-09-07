import { useTranslation } from "next-i18next";
import Image from "next/image";
import { RatioBox } from "~/components/Commons";
import { FlexColumn, Text } from "~/styles/mixins";

export const Iphone = () => {
  const { t } = useTranslation("common");

  return (
    <FlexColumn padding="32px 22px" gap={36}>
      <FlexColumn>
        <Text size="titleMedium">{t("잠깐만요")}</Text>

        <Text size="titleSmall" marginTop={16}>
          {t("팀버 서비스를 어플처럼 이용해 보세요")}
        </Text>

        <Text size="titleSmall" marginTop={8}>
          {t("간편한 설정을 통해 넓은 화면의 어플처럼 이용할 수 있어요")}
        </Text>
      </FlexColumn>

      <FlexColumn gap={12}>
        <Text size="titleSmall">1. {t("화면 하단의 공유버튼을 터치해주세요")}</Text>

        <RatioBox ratio="666/510">
          <Image src="/images/guide/iphone/1.png" alt="guide1" fill />
        </RatioBox>
      </FlexColumn>

      <FlexColumn gap={12}>
        <Text size="titleSmall">2. {t("홈 화면으로 추가 버튼을 터치해주세요")}</Text>

        <RatioBox ratio="666/1440">
          <Image src="/images/guide/iphone/2.jpeg" alt="guide1" fill />
        </RatioBox>
      </FlexColumn>

      <Text size="titleSmall">3. {t("이제 어플처럼 이용하실 수 있어요")}</Text>
    </FlexColumn>
  );
};
