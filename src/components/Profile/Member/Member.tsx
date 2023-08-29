import type { User } from "@supabase/auth-helpers-nextjs";
import { useTranslation } from "next-i18next";
import { NavbarLayout } from "~/components/Layouts";
import type { OneOfLanguage } from "~/types";
import { ProfileSection } from "../ProfileSection";
import { SectionTab } from "../SectionTab";
import { useMember } from "./Member.hooks";

export const Member = (props: { user: User }) => {
  const app = useMember(props);
  const { t, i18n } = useTranslation("profile");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <NavbarLayout>
      <ProfileSection profile={app.profile} isMine={app.isMine} />

      <SectionTab
        items={[
          { id: "IN_PROJECT", label: "진행 중인 프로젝트" },
          { id: "DONE_PROJECT", label: "완료된 프로젝트" }
        ]}
        selectedId={app.selectedTab}
        onClick={app.setSelectedTab}
      />
    </NavbarLayout>
  );
};
