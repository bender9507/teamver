import { useTranslation } from "next-i18next";
import { Avatar, IconButton } from "~/components/Commons";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { FlexColumn, LayoutContent, PosCenter, Position, SizeBox, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { useChatMessageBox } from "./ChatMessageBox.hooks";
import { Message } from "./Messages";

export const ChatMessageBox = ({ opponent }: { opponent: ProfileAllDataRow }) => {
  const app = useChatMessageBox();
  const { t } = useTranslation("chat");

  return (
    <>
      <LayoutContent onScroll={app.handleScroll}>
        {isEmpty(app.messages) && (
          <PosCenter>
            <Text as="p" textAlign="center" size="textMediumBold" color="gray6">
              {t("NAME님과 팀원 매칭 되었어요", { name: opponent.name })}
            </Text>

            <SizeBox height={24} />

            <Avatar size="xLarge" src={opponent.imageUrl} />
          </PosCenter>
        )}

        <FlexColumn gap={10} padding="26px 32px 7px 32px">
          {app.messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </FlexColumn>

        <div ref={app.bottomRef} />
      </LayoutContent>

      {!app.isScrollEnd && (
        <Position position="absolute" bottom={80} right={20}>
          <IconButton name="downButton" color="content1" onClick={() => app.handleScrollToEnd()} />
        </Position>
      )}
    </>
  );
};
