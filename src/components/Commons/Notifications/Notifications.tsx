import { useUser } from "@supabase/auth-helpers-react";
import type {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
  User
} from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { ChatRequestMemberRow } from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import { noticeKeys } from "~/states/server/notice/keys";
import { useInsertNoticeMember } from "~/states/server/notice/mutations";

export const Notifications = () => {
  const user = useUser() as User;
  const queryClient = useQueryClient();

  const { mutate: insertNoticeMemberMutate } = useInsertNoticeMember({
    onSuccess: () => {
      queryClient.invalidateQueries(noticeKeys.selectNoticeMember(user.id));
    }
  });

  useEffect(() => {
    if (!user.id) return;

    const notice = supabase
      .channel("notice")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatRequestMember",
          filter: `receiverId=eq.${user.id}`
        },
        (payload: RealtimePostgresInsertPayload<ChatRequestMemberRow>) => {
          console.log(payload);
          insertNoticeMemberMutate({
            receiverId: user.id,
            requesterId: payload.new.requesterId,
            state: "ChatRequest"
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chatRequestMember",
          filter: `requesterId=eq.${user.id}`
        },
        (payload: RealtimePostgresUpdatePayload<ChatRequestMemberRow>) => {
          if (payload.new.state === "GRANT") {
            console.log(payload);

            insertNoticeMemberMutate({
              receiverId: user.id,
              requesterId: payload.new.requesterId,
              state: "ChatGranted"
            });
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "projectInvite",
          filter: `receiverId=eq.${user.id}`
        },
        (payload) => {
          console.log(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notice);
    };
  }, [insertNoticeMemberMutate, user.id]);

  return <></>;
};
