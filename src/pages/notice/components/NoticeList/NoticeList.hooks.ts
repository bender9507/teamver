import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import type { NoticeState } from "~/states/server/notice";
import { useSelectNoticeQuery } from "~/states/server/notice/queries";

export const useNoticeList = (role: number) => {
  const [nowTime] = useState(new Date());

  const user = useUser() as User;
  const { t } = useTranslation("notice");
  const queryClient = useQueryClient();

  const { data: noticeData } = useSelectNoticeQuery({ myId: user.id, role });

  const elapsedTimeFormat = ({ date, now }: { date: string; now: Date }) => {
    const start = new Date(date).getTime();
    const end = now.getTime();
    const diff = (end - start) / 1000;

    const times = [
      { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
      { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
      { name: "일", milliSeconds: 60 * 60 * 24 },
      { name: "시간", milliSeconds: 60 * 60 },
      { name: "분", milliSeconds: 60 }
    ];

    const answer: string[] = [];
    times.forEach((el) => {
      const betweenTime = Math.floor(diff / el.milliSeconds);

      if (betweenTime > 0) answer.push(`${betweenTime}${el.name} 전`);
      if (el.name === "분" && betweenTime === 0) {
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

  return { noticeData, noticeCase, elapsedTimeFormat, nowTime, queryClient, user };
};
