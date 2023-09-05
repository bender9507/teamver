import { useTranslation } from "next-i18next";
import Link from "next/link";
import { routes } from "~/constants/routes";
import { Flex, FlexCenter, FlexColumn, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { ChatRoomCard } from "../ChatRoomCard";
import { InviteProjectCard } from "../InviteProjectCard";
import { useChatMember } from "./Member.hooks";

export const Member = () => {
  const app = useChatMember();
  const { t } = useTranslation("chat");

  return (
    <FlexColumn>
      <FlexColumn gap={18} marginTop={44}>
        <Text size="textLarge">{t("초대 받은 프로젝트")}</Text>

        {isEmpty(app.invites) && (
          <FlexCenter marginTop={22}>
            <Text size="textMediumBold" color="gray6">
              {t("초대받은 프로젝트가 없어요")}
            </Text>
          </FlexCenter>
        )}

        <FlexColumn gap={12}>
          {app.invites.map((invite) => (
            <InviteProjectCard key={invite.id} {...invite} />
          ))}
        </FlexColumn>
      </FlexColumn>

      <Flex marginTop={32} justify="end">
        <Link href={routes.chatRequest}>
          <Text size="textMedium" color="primary">
            {t("요청 N개", { count: app.requests.length })}
          </Text>
        </Link>
      </Flex>

      <FlexColumn gap={18} marginTop={22}>
        <Text size="textLarge">{t("채팅")}</Text>

        {isEmpty(app.rooms) && (
          <FlexCenter marginTop={22}>
            <Text size="textMediumBold" color="gray6">
              {t("진행중인 채팅이 없어요")}
            </Text>
          </FlexCenter>
        )}

        <FlexColumn gap={12}>
          {app.rooms.map((room) => (
            <ChatRoomCard key={room.id} user={app.user} room={room} />
          ))}
        </FlexColumn>
      </FlexColumn>
    </FlexColumn>
  );
};
