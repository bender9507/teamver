import type { User } from "@supabase/auth-helpers-nextjs";
import { useTranslation } from "next-i18next";

import { LogoHeaderWithNavbarLayout } from "~/components/Layouts";
import type { OneOfLanguage } from "~/types";

import { useOwner } from "./Owner.hook";

export const Owner = (props: { user: User }) => {
  const app = useOwner(props);
  const { t, i18n } = useTranslation("home");

  const currentLanguage = i18n.language as OneOfLanguage;

  return <LogoHeaderWithNavbarLayout>d</LogoHeaderWithNavbarLayout>;
};
