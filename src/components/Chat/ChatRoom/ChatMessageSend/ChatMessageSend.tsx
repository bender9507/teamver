import { IconButton, Input } from "~/components/Commons";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { Flex, FlexColumn } from "~/styles/mixins";
import { useChatMessageSend } from "./ChatMessageSend.hooks";

export const ChatMessageSend = (props: { opponent: ProfileAllDataRow }) => {
  const app = useChatMessageSend(props);

  return (
    <Flex
      as="form"
      align="center"
      justify="between"
      gap={10}
      padding="7px 16px 20px 16px"
      onSubmit={app.handleSendMessage}
    >
      <IconButton type="button" name="add" />

      <FlexColumn flex={1}>
        <Input
          color="gray5"
          rightElement={<IconButton type="button" name="smile" />}
          {...app.register("message", { required: true })}
        />
      </FlexColumn>

      <IconButton name="send" />
    </Flex>
  );
};
