import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Button, RatioBox } from "~/components/Commons";
import { FlexColumn, Text } from "~/styles/mixins";
import { usePWAInstallPrompt } from "./Android.hooks";

export const Android = () => {
  const app = usePWAInstallPrompt();

  const { t } = useTranslation("common");

  if (!app.showPrompt) return null;

  return (
    <FlexColumn align="center" gap={30} padding="50px 0 30px 0">
      <FlexColumn align="center" gap={10}>
        <Text size="titleSmall">{t("어플에서 더 많은 팀원을 만나보세요")}</Text>
        <Text color="gray9">{t("크롬 환경에서 설치 가능합니다")}</Text>
      </FlexColumn>

      <RatioBox ratio="300/300">
        <Image src="/images/board2.png" layout="fill" objectFit="contain" alt="board" priority />
      </RatioBox>

      <Button
        style={{ position: "absolute", bottom: "100px", width: "80%" }}
        onClick={app.promptToInstall}
      >
        {t("설치하기")}
      </Button>

      <Text color="gray9" size="textMedium" onClick={app.dismissAndAvoidFuturePrompts}>
        {t("괜찮아요 모바일 웹으로 볼게요")}
      </Text>
    </FlexColumn>
  );
};
