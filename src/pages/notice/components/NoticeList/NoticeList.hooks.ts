import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import type { NoticeState } from "~/states/server/notice";
import { useSelectNoticeQuery } from "~/states/server/notice/queries";

export const useNoticeList = (role: number) => {
  const user = useUser() as User;
  const { t } = useTranslation("notice");

  const { data: noticeData } = useSelectNoticeQuery({ myId: user.id, role });

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

  return { noticeData, noticeCase };
};
