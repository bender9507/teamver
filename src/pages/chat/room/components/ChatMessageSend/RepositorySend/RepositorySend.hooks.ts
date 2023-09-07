import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useModal } from "~/components/Commons";
import type { ChatMessageData } from "~/states/server/chat";
import { chatKeys, useInsertChatMessageMutate } from "~/states/server/chat";
import { useGetReposQuery } from "~/states/server/github";
import { useSelectProfileQuery } from "~/states/server/profile";
import { REPOSITORY_SEND_MODAL } from "./RepositorySend";

export const useRepositorySend = () => {
  const user = useUser() as User;
  const router = useRouter();
  const queryClient = useQueryClient();

  const roomId = router.query.roomId as string;

  const { unmount } = useModal();

  const { data: profile } = useSelectProfileQuery(user.id);
  const { data: repos } = useGetReposQuery(profile.github);

  const { mutate: insertChatMessageMutate } = useInsertChatMessageMutate({
    onSuccess: (message) => {
      queryClient.setQueryData<ChatMessageData[]>(
        chatKeys.selectChatMessages(Number(roomId)),
        (prevMessage) => {
          if (!prevMessage) return prevMessage;

          return [...prevMessage, message];
        }
      );
    },
    onSettled: () => unmount(REPOSITORY_SEND_MODAL)
  });

  const handleSendRepository = (repoUrl: string) => {
    insertChatMessageMutate({
      roomId: Number(roomId),
      senderId: user.id,
      message: repoUrl,
      type: "REPOSITORY"
    });
  };

  return {
    repos,
    handleSendRepository
  };
};
