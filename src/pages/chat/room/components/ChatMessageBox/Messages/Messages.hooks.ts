import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import type { ChatMessageData } from "~/states/server/chat";

export const useMessages = ({ message: { createdAt } }: { message: ChatMessageData }) => {
  const { t } = useTranslation("chat");

  const time = useMemo(() => {
    const time = dayjs(createdAt);

    const hour = time.hour();

    if (hour < 12) {
      return `${t("오전")} ${time.format("h:mm")}`;
    }

    return `${t("오후")} ${time.format("h:mm")}`;
  }, [createdAt, t]);

  return {
    time
  };
};
