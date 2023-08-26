import { useTranslation } from "next-i18next";
import { Text } from "~/styles/mixins";
import { Button } from "../Commons";
import { useProjectInvite } from "./ProjectInvite.hooks";

export const ProjectInvite = ({ ownerId }: { ownerId: string }) => {
  const { t } = useTranslation("project");
  const { projects, selectProject } = useProjectInvite(ownerId);

  return (
    <div>
      <Text>{t("어떤 프로젝트에 초대할까요?")}</Text>
      <div>
        {projects?.map((project) => (
          <Button key={project.id} onClick={() => selectProject(project.id)}>
            {project.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
