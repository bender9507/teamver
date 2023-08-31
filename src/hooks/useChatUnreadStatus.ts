// useChatUnreadStatus.js
import { useEffect, useState } from "react";
import { supabase } from "~/states/server/config";
import { getChatReadStatus } from "./api"; // 위에서 작성한 API 함수

export const useChatUnreadStatus = (userId: string) => {
  const [unreadStatus, setUnreadStatus] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchUnreadStatus = async () => {
      try {
        const chatRooms = await supabase.from("chatRooms").select("*");
        for (const room of chatRooms.data) {
          const lastMessageIdInRoom = room.messages[room.messages.length - 1]?.id;
          const lastReadMessageIdInRoom = await getChatReadStatus(userId, room.id);

          if (lastMessageIdInRoom !== lastReadMessageIdInRoom) {
            if (!isCancelled) setUnreadStatus(true);
            break;
          }
        }
      } catch (error) {
        console.error("Error fetching unread status:", error);
      }
    };

    fetchUnreadStatus();

    return () => {
      isCancelled = true;
    };
  }, [userId]);

  return unreadStatus;
};
