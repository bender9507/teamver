import { useUser } from "@supabase/auth-helpers-react";
import type { RealtimePostgresUpdatePayload, User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useMount } from "react-use";
import type { ChatRequestMemberRow, ChatRequestOwnerRow } from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import { noticeKeys } from "~/states/server/notice/keys";
import type { ProjectInviteRow } from "~/states/server/project";

export const Notifications = () => {
  const user = useUser() as User;
  const queryClient = useQueryClient();

  useMount(() => {
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
        () => {
          queryClient.invalidateQueries(noticeKeys.selectNoticeOwner(user.id));
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
            queryClient.invalidateQueries(noticeKeys.selectNoticeMember(user.id));
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chatRequestOwner",
          filter: `requesterId=eq.${user.id}`
        },
        (payload: RealtimePostgresUpdatePayload<ChatRequestOwnerRow>) => {
          if (payload.new.state === "GRANT") {
            queryClient.invalidateQueries(noticeKeys.selectNoticeOwner(user.id));
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatRequestOwner",
          filter: `receiverId=eq.${user.id}`
        },
        () => {
          queryClient.invalidateQueries(noticeKeys.selectNoticeMember(user.id));
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
        () => {
          queryClient.invalidateQueries(noticeKeys.selectNoticeMember(user.id));
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "projectInvite",
          filter: `requesterId=eq.${user.id}`
        },
        (payload: RealtimePostgresUpdatePayload<ProjectInviteRow>) => {
          if (payload.new.state === "GRANT") {
            queryClient.invalidateQueries(noticeKeys.selectNoticeOwner(user.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notice);
    };
  });

  return <></>;
};
