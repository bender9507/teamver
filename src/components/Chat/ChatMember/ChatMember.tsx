import { useTranslation } from "next-i18next";
import type { ComponentProps } from "react";
import type Chat from "~/pages/chat/index.page";
import { FlexColumn, Text } from "~/styles/mixins";
import { ChatRoomCard } from "../ChatRoomCard";
import { InviteProjectCard } from "../InviteProjectCard";
import { useChatMember } from "./ChatMember.hooks";

export const ChatMember = (props: ComponentProps<typeof Chat>) => {
  const app = useChatMember(props);
  const { t } = useTranslation("chat");

  return (
    <FlexColumn>
      <FlexColumn>
        <Text size="textLarge">{t("초대 받은 프로젝트")}</Text>

        <FlexColumn>
          {app.invites.map((invite) => (
            <InviteProjectCard key={invite.id} {...invite} />
          ))}
        </FlexColumn>
      </FlexColumn>

      <FlexColumn>
        <Text size="textLarge">{t("채팅")}</Text>

        <FlexColumn gap={12}>
          {app.rooms.map((room) => (
            <ChatRoomCard key={room.id} {...room} />
          ))}
        </FlexColumn>
      </FlexColumn>
    </FlexColumn>
  );
};
