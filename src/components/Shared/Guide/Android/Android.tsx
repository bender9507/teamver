import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Button, RatioBox } from "~/components/Commons";
import { FlexColumn, Text } from "~/styles/mixins";
import { usePWAInstallPrompt } from "./Android.hooks";

export const Android = () => {
  const app = usePWAInstallPrompt();

  const { t } = useTranslation("common");

  return (
    <FlexColumn align="center" gap={30} padding="50px 0 30px 0">
      <Text>{t("어플을 설치하시겠습니까")}</Text>
      <RatioBox ratio="300/300">
        <Image src="/images/board2.png" layout="fill" objectFit="contain" alt="board" />
      </RatioBox>
      <Button
        style={{ position: "absolute", bottom: "80px", width: "70%" }}
        onClick={app.promptToInstall}
      >
        {t("설치하기")}
      </Button>
    </FlexColumn>
  );
};
