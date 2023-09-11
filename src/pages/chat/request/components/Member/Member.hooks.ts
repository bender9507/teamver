import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useDialog } from "~/components/Commons";
import type { ChatRequestOwnerAllData } from "~/states/server/chat";
import {
  chatKeys,
  useSelectChatRequestOwnerQuery,
  useUpdateChatRequestStateOwnerMutate
} from "~/states/server/chat";
import { useInsertNoticeOwner } from "~/states/server/notice";

export const useChatRequestMember = () => {
  const user = useUser() as User;
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useDialog();

  const { data: requests } = useSelectChatRequestOwnerQuery({
    receiverId: user.id,
    state: "PENDING"
  });

  const { mutate: insertNoticeOwnerMutate } = useInsertNoticeOwner();

  const { mutate: updateStateMutate } = useUpdateChatRequestStateOwnerMutate({
    onSuccess: async (_, { state }) => {
      await queryClient.invalidateQueries(
        chatKeys.selectChatRequestOwner({ receiverId: user.id, state: "PENDING" })
      );

      toast({
        type: "success",
        message:
          state === "GRANT" ? t("채팅 요청을 수락하였습니다.") : t("채팅 요청을 거절하였습니다.")
      });
    },
    onError: () => toast({ type: "success", message: "채팅 수락에 실패하였습니다." })
  });

  const handleRequestGrant = (request: ChatRequestOwnerAllData) => {
    updateStateMutate({ id: request.id, state: "GRANT" });
    insertNoticeOwnerMutate({
      receiverId: request.requesterProfile.id,
      requesterId: user.id,
      state: "ChatGranted"
    });
  };

  const handleRequestDenied = (request: ChatRequestOwnerAllData) => {
    updateStateMutate({ id: request.id, state: "DENIED" });
  };

  return {
    user,
    requests,
    handleRequestDenied,
    handleRequestGrant
  };
};
