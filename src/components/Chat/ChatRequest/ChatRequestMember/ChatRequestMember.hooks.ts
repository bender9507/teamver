import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import type { ComponentProps } from "react";
import { useDialog } from "~/components/Commons";
import type { ChatRequestOwnerAllData } from "~/states/server/chat";
import {
  chatKeys,
  useSelectChatRequestOwnerQuery,
  useUpdateChatRequestStateOwnerMutate
} from "~/states/server/chat";
import type { ChatRequestMember } from ".";

export const useChatRequestMember = ({ user }: ComponentProps<typeof ChatRequestMember>) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useDialog();

  const { data: requests } = useSelectChatRequestOwnerQuery({
    receiverId: user.id,
    state: "PENDING"
  });

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
  };

  const handleRequestDenied = (request: ChatRequestOwnerAllData) => {
    updateStateMutate({ id: request.id, state: "DENIED" });
  };

  return {
    requests,
    handleRequestDenied,
    handleRequestGrant
  };
};
