import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import type { ChatMessageData } from "~/states/server/chat";
import { useRoomContext } from "../../../index.page";

export const useMessages = ({
  message: { id, createdAt, sender }
}: {
  message: ChatMessageData;
}) => {
  const { t } = useTranslation();

  const { messages } = useRoomContext();

  const time = useMemo(() => {
    const time = dayjs(createdAt);

    const hour = time.hour();

    if (hour < 12) {
      return `${t("오전")} ${time.format("h:mm")}`;
    }

    return `${t("오후")} ${time.format("h:mm")}`;
  }, [createdAt, t]);

  const isChaining = useMemo(() => {
    const index = messages.findIndex((_message) => _message.id === id);

    return messages[index - 1]?.sender.id === sender.id;
  }, [id, messages, sender.id]);

  return {
    time,
    isChaining
  };
};
