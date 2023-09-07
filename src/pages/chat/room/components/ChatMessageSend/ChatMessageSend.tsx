import { IconButton, Input } from "~/components/Commons";
import { Flex, FlexColumn } from "~/styles/mixins";
import { useChatMessageSend } from "./ChatMessageSend.hooks";
import { EmojiSend } from "./EmojiSend";
import { REPOSITORY_SEND_MODAL, RepositorySend } from "./RepositorySend";

export const ChatMessageSend = () => {
  const app = useChatMessageSend();

  return (
    <FlexColumn>
      <Flex
        as="form"
        align="center"
        justify="between"
        gap={10}
        padding="7px 16px"
        onSubmit={app.handleSendMessage}
      >
        <IconButton
          type="button"
          name="add"
          onClick={() =>
            app.mount(<RepositorySend />, { id: REPOSITORY_SEND_MODAL, type: "bottom" })
          }
        />

        <FlexColumn flex={1}>
          <Input
            color="gray5"
            rightElement={
              <IconButton type="button" name="smile" onClick={app.setIsOpenEmoji.toggle} />
            }
            disableSubmit={false}
            {...app.register("message", { required: true })}
          />
        </FlexColumn>

        <IconButton name="send" />
      </Flex>

      {app.isOpenEmoji && <EmojiSend />}
      {app.isOpenRepos && <RepositorySend />}
    </FlexColumn>
  );
};
