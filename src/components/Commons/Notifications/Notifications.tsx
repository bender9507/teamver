import { useUser } from "@supabase/auth-helpers-react";
import type {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
  User
} from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { ChatRequestMemberRow, ChatRequestOwnerRow } from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import { noticeKeys } from "~/states/server/notice/keys";
import { useInsertNoticeMember, useInsertNoticeOwner } from "~/states/server/notice/mutations";
import type { ProjectInviteRow } from "~/states/server/project";

export const Notifications = () => {
  const user = useUser() as User;
  const queryClient = useQueryClient();

  const { mutate: insertNoticeMemberMutate } = useInsertNoticeMember({
    onSuccess: () => {
      queryClient.invalidateQueries(noticeKeys.selectNoticeMember(user.id));
    }
  });

  const { mutate: insertNoticeOwnerMutate } = useInsertNoticeOwner({
    onSuccess: () => {
      queryClient.invalidateQueries(noticeKeys.selectNoticeOwner(user.id));
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
          console.log("im owner"); // 내가 오너일때 멤버모드인 다른사람이 나에게 채팅요청했을때 알림
          console.log(payload);
          insertNoticeOwnerMutate({
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
            console.log("im member"); // 내가 멤버일때 내가보낸 채팅요청을 오너가 수락했을때 알림
            console.log(payload);

            insertNoticeMemberMutate({
              receiverId: user.id,
              requesterId: payload.new.receiverId,
              state: "ChatGranted"
            });
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
          console.log("im owner"); // 내가 오너일때 내가보낸 채팅요청을 멤버가 수락했을때 알림
          console.log(payload);

          insertNoticeOwnerMutate({
            receiverId: user.id,
            requesterId: payload.new.receiverId,
            state: "ChatGranted"
          });
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
        (payload: RealtimePostgresInsertPayload<ChatRequestOwnerRow>) => {
          console.log("im member"); // 내가 멤버일때 오너모드인 다른사람이 나를 채팅요청 했을때 알림
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
          event: "INSERT",
          schema: "public",
          table: "projectInvite",
          filter: `receiverId=eq.${user.id}`
        },
        (payload: RealtimePostgresInsertPayload<ProjectInviteRow>) => {
          console.log("im member"); // 내가 멤버일때 오너모드인 다른사람이 나를 프로젝트에 초대했을때 알림
          console.log(payload);

          insertNoticeMemberMutate({
            receiverId: user.id,
            requesterId: payload.new.requesterId,
            state: "TeamRequest"
          });
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
          console.log("im owner"); // 내가 오너일때 내가보낸 프로젝트 초대를 멤버가 수락했을때 알림
          console.log(payload);

          insertNoticeOwnerMutate({
            receiverId: user.id,
            requesterId: payload.new.receiverId,
            state: "TeamGranted"
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notice);
    };
  }, [insertNoticeMemberMutate, insertNoticeOwnerMutate, user.id]);

  return <></>;
};
