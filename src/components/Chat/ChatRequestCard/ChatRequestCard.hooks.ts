import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import type { ComponentProps } from "react";
import { useDialog } from "~/components/Commons";
import { chatKeys, useUpdateChatRequestStateMemberMutate } from "~/states/server/chat";
import type { ChatRequestCard } from "./ChatRequestCard";

export const useChatRequestCard = ({ request, user }: ComponentProps<typeof ChatRequestCard>) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useDialog();

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
    onError: () => toast({ type: "success", message: "채팅 수락에 실패하였습니다." })
  });

  const handleRequestGrant = () => {
    updateStateMutate({ id: request.id, state: "GRANT" });
  };

  const handleRequestDenied = () => {
    updateStateMutate({ id: request.id, state: "DENIED" });
  };

  return {
    handleRequestDenied,
    handleRequestGrant
  };
};
