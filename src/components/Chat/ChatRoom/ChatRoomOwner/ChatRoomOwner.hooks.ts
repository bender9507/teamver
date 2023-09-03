import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useRef } from "react";
import { useDialog } from "~/components/Commons";
import { useSelectChatRoomQuery } from "~/states/server/chat";
import { useInsertProjectInviteMutate } from "~/states/server/project";

export const useChatRoomOwner = () => {
  const selectedProject = useRef("");

  const user = useUser() as User;
  const router = useRouter();
  const { t } = useTranslation();

  const roomId = router.query.roomId as string;

  const { confirm, toast } = useDialog();

  const { data: chatRoom } = useSelectChatRoomQuery({ roomId, userId: user.id });

  const { mutate: projectInviteMutate } = useInsertProjectInviteMutate({
    onSuccess: () => {
      toast({ type: "success", message: t("프로젝트에 초대했어요") });
    },
    onError: () => {
      toast({ type: "error", message: t("프로젝트 초대에 실패했어요") });
    }
  });

  const handleInvite = () => {
    if (!selectedProject.current) return;

    projectInviteMutate({
      projectId: Number(selectedProject.current),
      requesterId: user.id,
      receiverId: chatRoom.members[0].id
    });
  };

  const handleChangeProject = (event: ChangeEvent<HTMLInputElement>) => {
    selectedProject.current = event.target.value;
  };

  return {
    user,
    chatRoom,
    opponent: chatRoom.members[0],
    confirm,
    toast,
    handleInvite,
    handleChangeProject
  };
};
