import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createContext, useContext } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Button, IconButton } from "~/components/Commons";
import { routes } from "~/constants/routes";
import type { ConstantAllData } from "~/states/server/constant";
import { selectProfile } from "~/states/server/profile";
import type { OneOfLanguage } from "~/types";

import { FlexColumn, LayoutHeaderWithNav } from "~/styles/mixins";
import { getObjectValues } from "~/utils";
import { stepComponents } from "./welcome.constants";
import { useWelcome } from "./welcome.hooks";
import * as Styled from "./welcome.styles";
import type { WelcomeForm } from "./welcome.types";

export const WelcomeContext = createContext<{
  welcomeForm: UseFormReturn<WelcomeForm>;
  constants: ConstantAllData;
  currentLanguage: OneOfLanguage;
} | null>(null);

const Welcome = () => {
  const app = useWelcome();
  const { t } = useTranslation("welcome");

  const CurrentStepComponent = getObjectValues(stepComponents)[app.step].component;

  return (
    <WelcomeContext.Provider value={app.values}>
      <LayoutHeaderWithNav>
        <Styled.Header>
          <IconButton type="button" name="arrowBack" color="content1" onClick={app.prevStep} />

          <Styled.Progress current={app.step} max={app.lastStep} />
        </Styled.Header>

        <FlexColumn as="form" padding="0 22px" gap={22} onSubmit={app.handleCreateProfile}>
          <CurrentStepComponent />
        </FlexColumn>

        <FlexColumn padding="22px">
          {app.step === app.lastStep && <Button disabled={app.isDisabled}>{t("시작하기")}</Button>}

          {app.step !== app.lastStep && (
            <Button type="button" disabled={app.isDisabled} onClick={app.nextStep}>
              {t("다음")}
            </Button>
          )}
        </FlexColumn>
      </LayoutHeaderWithNav>
    </WelcomeContext.Provider>
  );
};

export default Welcome;

export const useWelcomeContext = () => {
  const context = useContext(WelcomeContext);

  if (!context) {
    throw new Error("useWelcomeContext is only available within Welcome");
  }

  return context;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const { data: userData } = await supabaseServer.auth.getUser();

  const user = userData.user as User;

  const profile = await selectProfile(user.id);

  if (profile) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false
      }
    };
  }

  return {
    props: {
      user,
      ...(await serverSideTranslations(context.locale as string, ["common", "welcome"]))
    }
  };
};
