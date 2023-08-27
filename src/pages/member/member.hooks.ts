import { useState } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "~/components/Commons";
import type { ConstantProjectTypeRow } from "~/states/server/constant";
import { useGetConstantQuery } from "~/states/server/constant";

export const useMember = () => {
  const [selectedProjectType, setSelectedProjectType] = useState<ConstantProjectTypeRow>();

  const { mount, unmount } = useModal();
  const { register, handleSubmit } = useForm<{ projectType: ConstantProjectTypeRow["id"] }>();

  const { data: constants } = useGetConstantQuery(["projectTypes"]);

  const handleChangeProjectType: Parameters<typeof handleSubmit>[0] = ({ projectType }) => {
    const selectedProjectType = constants.projectTypes.find(
      (_projectType) => _projectType.id === Number(projectType)
    );

    setSelectedProjectType(selectedProjectType);

    unmount("selectProjectType");
  };

  return {
    mount,
    constants,
    register,
    handleSubmit,
    selectedProjectType,
    handleChangeProjectType
  };
};
