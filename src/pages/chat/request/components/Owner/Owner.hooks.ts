import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useDialog } from "~/components/Commons";
import type { ChatRequestMemberAllData } from "~/states/server/chat";
import {
  chatKeys,
  useSelectChatRequestMemberQuery,
  useUpdateChatRequestStateMemberMutate
} from "~/states/server/chat";
import { useInsertNoticeMember } from "~/states/server/notice";

export const useChatRequestOwner = () => {
  const queryClient = useQueryClient();
  const user = useUser() as User;
  const { t } = useTranslation("chat");
  const { toast } = useDialog();

  const { data: requests } = useSelectChatRequestMemberQuery({
    receiverId: user.id,
    state: "PENDING"
  });

  const { mutate: insertNoticeMemberMutate } = useInsertNoticeMember();

  const { mutate: updateStateMutate } = useUpdateChatRequestStateMemberMutate({
    onSuccess: async (_, { state }) => {
      await queryClient.invalidateQueries(
        chatKeys.selectChatRequestMember({ receiverId: user.id, state: "PENDING" })
      );

      toast({
        type: "success",
        message:
          state === "GRANT" ? t("채팅 요청을 수락하였습니다.") : t("채팅 요청을 거절하였습니다.")
      });
    },
    onError: () => toast({ type: "success", message: t("채팅 요청을 거절하였습니다.") })
  });

  const handleRequestGrant = (request: ChatRequestMemberAllData) => {
    updateStateMutate({ id: request.id, state: "GRANT" });
    insertNoticeMemberMutate({
      receiverId: request.requesterProfile.id,
      requesterId: user.id,
      state: "ChatGranted"
    });
  };

  const handleRequestDenied = (request: ChatRequestMemberAllData) => {
    updateStateMutate({ id: request.id, state: "DENIED" });
  };

  return {
    user,
    requests,
    handleRequestGrant,
    handleRequestDenied
  };
};
