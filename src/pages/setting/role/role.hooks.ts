import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useDialog } from "~/components/Commons";
import { profileKeys, useSelectProfileQuery, useUpdateRoleMutate } from "~/states/server/profile";

export const useRole = (userId: string) => {
  const { t } = useTranslation("setting");

  const queryClient = useQueryClient();

  const { toast, confirm } = useDialog();

  const { data: profile } = useSelectProfileQuery(userId);

  const { mutateAsync: updateRole } = useUpdateRoleMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(profileKeys.selectProfile(userId));

      toast({ type: "success", message: t("성공적으로 변경했습니다") });
    },

    onError: () => {
      toast({ type: "error", message: t("변경에 실패했습니다") });
    }
  });

  const changeRole = async (newRole: number) => {
    await updateRole({ id: userId, role: newRole });
  };

  const handleClickParticipantMode = async () => {
    if (!(await confirm({ title: "참가자 모드로 변경하시겠습니까" }))) return;

    await changeRole(2);
  };

  const handleClickRecruiterMode = async () => {
    if (!(await confirm({ title: "모집자 모드로 변경하시겠습니까" }))) return;

    await changeRole(1);
  };

  return { profile, handleClickParticipantMode, handleClickRecruiterMode };
};
