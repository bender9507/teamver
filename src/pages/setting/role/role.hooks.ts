import { useTranslation } from "next-i18next";
import { useDialog } from "~/components/Commons";
import { useUpdateRoleMutate } from "~/states/server/profile";

export const useRole = (userId: string) => {
  const { t } = useTranslation("setting");

  const { toast } = useDialog();

  const { mutateAsync: updateRole } = useUpdateRoleMutate({
    onSuccess: () => {
      // 역할 업데이트 성공 시 실행할 코드를 여기에 작성합니다.
    },
    onError: (error) => {
      toast({ type: "error", message: t("변경에 실패했습니다") });
    }
  });

  const changeRole = async (newRole: number) => {
    await updateRole({ id: userId, role: newRole });
  };

  const handleClickParticipantMode = async () => {
    await changeRole(2);
  };

  const handleClickRecruiterMode = async () => {
    await changeRole(1);
  };

  return { handleClickParticipantMode, handleClickRecruiterMode };
};
