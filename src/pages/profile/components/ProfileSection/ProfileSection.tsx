import { useTranslation } from "next-i18next";
import { CategoryTab } from "../CategoryTab";
import { ProfileBox } from "../ProfileBox";
import { useProfileSection } from "./ProfileSection.hooks";
import type { ProfileSectionProps } from "./ProfileSection.types";

export const ProfileSection = ({ selectedTab, setSelectedTab }: ProfileSectionProps) => {
  const app = useProfileSection();

  const { t } = useTranslation("profile");

  return (
    <>
      <ProfileBox profile={app.profile} isMine={app.isMine} />

      <CategoryTab
        items={[
          { id: "IN_PROJECT", label: t("진행 중인 프로젝트") },
          { id: "DONE_PROJECT", label: t("완료된 프로젝트") }
        ]}
        selectedId={selectedTab}
        onClick={setSelectedTab}
      />
    </>
  );
};
