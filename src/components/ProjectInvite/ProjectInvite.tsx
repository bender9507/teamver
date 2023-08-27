import { useTranslation } from "next-i18next";
import { Text } from "~/styles/mixins";
import { useProjectInvite } from "./ProjectInvite.hooks";

export const ProjectInvite = ({ ownerId }: { ownerId: string }) => {
  const { t } = useTranslation("project");
  const app = useProjectInvite(ownerId);
  console.log("프로젝트", app);

  return (
    <div>
      <Text>{t("어떤 프로젝트에 초대할까요?")}</Text>
      <div>
        {app.projects.map((project) => (
          <Text key={project.id}>{project.name}</Text>
        ))}
      </div>
    </div>
  );
};
