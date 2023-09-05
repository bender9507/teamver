import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useDialog, useModal } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { useUpdateChatMemberStateMutate } from "~/states/server/chat";
import { CHAT_HEADER_MORE_MODAL } from ".";

export const useChatHeaderMore = () => {
  const router = useRouter();

  const user = useUser() as User;
  const roomId = router.query.roomId as string;

  const { toast } = useDialog();
  const { unmount } = useModal();

  const { mutate: updateChatMemberStateMutate } = useUpdateChatMemberStateMutate({
    onSuccess: () => {
      router.replace(routes.chat);

      unmount(CHAT_HEADER_MORE_MODAL);
    },
    onError: () => {
      toast({ type: "error", message: "채팅방에서 나가는데 실패했어요" });
    }
  });

  const handleDeleteChatMember = () => {
    updateChatMemberStateMutate({ userId: user.id, roomId: Number(roomId), state: false });
  };

  return {
    handleDeleteChatMember
  };
};
