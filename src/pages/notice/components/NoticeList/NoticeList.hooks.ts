import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDialog } from "~/components/Commons";
import {
  noticeKeys,
  useDeleteNoticeMember,
  useDeleteNoticeOwner,
  useUpdateNoticeMember,
  useUpdateNoticeOwner,
  type NoticeState
} from "~/states/server/notice";
import { useSelectNoticeQuery } from "~/states/server/notice/queries";
import type { NoticeList } from ".";

export const useNoticeList = ({ role, isDelete }: Parameters<typeof NoticeList>[0]) => {
  const [nowTime] = useState(new Date());

  const { t } = useTranslation("notice");
  const queryClient = useQueryClient();
  const user = useUser() as User;
  const router = useRouter();

  const { toast } = useDialog();
  const { data: noticeData } = useSelectNoticeQuery({ myId: user.id, role });

  const { mutate: updateNoticeMemberMutate } = useUpdateNoticeMember({
    onSuccess: () => {
      queryClient.invalidateQueries(noticeKeys.selectNoticeMember(user.id));
    }
  });

  const { mutate: updateNoticeOwnerMutate } = useUpdateNoticeOwner({
    onSuccess: () => {
      queryClient.invalidateQueries(noticeKeys.selectNoticeOwner(user.id));
    }
  });

  const { mutate: deleteNoticeMemberMutate } = useDeleteNoticeMember({
    onSuccess: () => {
      toast({ type: "success", message: t("알림이 삭제되었어요") });
      queryClient.invalidateQueries(noticeKeys.selectNoticeMember(user.id));
    },
    onError: () => {
      toast({ type: "error", message: t("알림 삭제에 실패했어요") });
    }
  });

  const { mutate: deleteNoticeOwnerMutate } = useDeleteNoticeOwner({
    onSuccess: () => {
      toast({ type: "success", message: t("알림이 삭제되었어요") });
      queryClient.invalidateQueries(noticeKeys.selectNoticeOwner(user.id));
    },
    onError: () => {
      toast({ type: "error", message: t("알림 삭제에 실패했어요") });
    }
  });

  const handleDelete = (id: number) => {
    if (role === 1) {
      deleteNoticeOwnerMutate(id);
    } else {
      deleteNoticeMemberMutate(id);
    }
  };

  const handleNoticeClick = ({
    id,
    clicked,
    state
  }: {
    id: number;
    clicked: boolean;
    state: NoticeState;
  }) => {
    if (isDelete) return;

    if (!clicked && role === 1) {
      updateNoticeOwnerMutate(id);
    } else if (!clicked && role === 2) {
      updateNoticeMemberMutate(id);
    }

    if (state === "ChatRequest") return router.push("/chat/request");

    router.push("/chat");
  };

  const elapsedTimeFormat = ({ date, now }: { date: string; now: Date }) => {
    const start = new Date(date).getTime();
    const end = now.getTime();
    const diff = (end - start) / 1000;

    const times = [
      { name: t("년"), milliSeconds: 60 * 60 * 24 * 365 },
      { name: t("개월"), milliSeconds: 60 * 60 * 24 * 30 },
      { name: t("일"), milliSeconds: 60 * 60 * 24 },
      { name: t("시간"), milliSeconds: 60 * 60 },
      { name: t("분"), milliSeconds: 60 }
    ];

    const answer: string[] = [];
    times.forEach((el) => {
      const betweenTime = Math.floor(diff / el.milliSeconds);

      if (betweenTime > 0) answer.push(`${betweenTime}${el.name} ${t("전")}`);
      if (el.name === t("분") && betweenTime === 0) {
        return answer.push("방금 전");
      }
    });

    return answer[0];
  };

  const noticeCase = ({ state, requester }: { state: NoticeState; requester: string }) => {
    switch (state) {
      case "ChatRequest":
        return t("N님에게 채팅요청을 받았어요", { name: requester });
      case "ChatGranted":
        return t("N님이 채팅을 수락했어요", { name: requester });
      case "TeamRequest":
        return t("N님이 프로젝트에 초대했어요", { name: requester });
      case "TeamGranted":
        return t("N님이 프로젝트의 멤버가 되었어요", { name: requester });
      default:
        break;
    }
  };

  return {
    noticeData,
    noticeCase,
    elapsedTimeFormat,
    handleDelete,
    handleNoticeClick,
    nowTime,
    queryClient,
    user
  };
};
