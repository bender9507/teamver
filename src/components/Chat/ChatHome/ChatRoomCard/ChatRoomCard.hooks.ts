import { useQueryClient } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { useMount } from "react-use";
import { chatKeys } from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import type { ChatRoomCard } from ".";

export const useChatRoomCard = ({ room, user }: ComponentProps<typeof ChatRoomCard>) => {
  const queryClient = useQueryClient();

  useMount(() => {
    const subscribeRoom = supabase
      .channel("chatRooms")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatMessages",
          filter: `roomId=eq.${room.id}`
        },
        () => queryClient.invalidateQueries(chatKeys.selectChatRooms(user.id))
      )
      .subscribe();

    return () => {
      subscribeRoom.unsubscribe();
    };
  });

  return {
    opponent: room.members[0],
    lastMessage: room.messages[0]
  };
};
