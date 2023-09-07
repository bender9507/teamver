import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { Avatar, IconButton } from "~/components/Commons";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { PosCenter, Position, SizeBox, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { useChatMessageBox } from "./ChatMessageBox.hooks";
import { Message } from "./Messages";

import * as Styled from "./ChatMessageBox.styles";

export const ChatMessageBox = ({ opponent }: { opponent: ProfileAllDataRow }) => {
  const app = useChatMessageBox();
  const { t } = useTranslation("chat");

  const lastTimestamp: Date | null = null;

  return (
    <Styled.Container>
      {isEmpty(app.messages) && (
        <PosCenter>
          <Text as="p" textAlign="center" size="textMediumBold" color="gray6">
            {t("NAME님과 팀원 매칭 되었어요", { name: opponent.name })}
          </Text>

          <SizeBox height={24} />

          <Avatar size="xLarge" src={opponent.imageUrl} />
        </PosCenter>
      )}

      <Styled.ChatBox onScroll={app.handleScroll}>
        {app.messages.map((message, index) => {
          const prevMessage = app.messages[index - 1];
          const nextMessage = app.messages[index + 1];

          const isSameUser = prevMessage && prevMessage.sender.id === message.sender.id;

          const isWithinOneMinute =
            prevMessage && dayjs(message.createdAt).diff(prevMessage.createdAt) < 60000;

          const showProfile = !(isSameUser && isWithinOneMinute);
          const showTime = !(
            nextMessage &&
            nextMessage.sender.id === message.sender.id &&
            dayjs(nextMessage.createdAt).diff(message.createdAt) < 60000
          );

          return (
            <Message
              key={message.id}
              message={message}
              showProfile={showProfile}
              showTime={showTime}
            />
          );
        })}

        <div ref={app.bottomRef} />
      </Styled.ChatBox>

      {!app.isScrollEnd && (
        <Position position="absolute" bottom={0} right={20}>
          <IconButton name="downButton" color="content1" onClick={() => app.handleScrollToEnd()} />
        </Position>
      )}
    </Styled.Container>
  );
};
