import type { User } from "@supabase/auth-helpers-nextjs";
import { useTranslation } from "next-i18next";
import { Avatar, Button, PreviousButton } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useChatRequestMember } from "./ChatRequestMember.hooks";
import * as Styled from "./ChatRequestMember.styles";

export const ChatRequestMember = ({ user }: { user: User }) => {
  const { t } = useTranslation("chat");

  const app = useChatRequestMember(user.id);

  return (
    <FlexColumn>
      <Flex justify="between" align="center">
        <PreviousButton />
        <Text>{t("채팅 요청")}</Text>
      </Flex>

      <FlexColumn gap={18}>
        {app.requests.length === 0 ? (
          <Styled.NoRequestBox>
            <Text>{t("받은 채팅 요청이 없어요.")}</Text>
          </Styled.NoRequestBox>
        ) : (
          app.requests.map((request) => (
            <Flex key={request.id} justify="between" align="center">
              <Flex align="center" gap={16}>
                <Avatar src={request.imageUrl} />
                <Text>{request.name}</Text>
              </Flex>

              <Flex gap={12}>
                <Button
                  onClick={() =>
                    app.handleAcceptClick({
                      id: request.id,
                      requesterId: request.requesterId,
                      receiverId: user.id
                    })
                  }
                >
                  {t("수락")}
                </Button>
                <Button onClick={() => app.handleDenyClick(request.id)}>{t("삭제")}</Button>
              </Flex>
            </Flex>
          ))
        )}
      </FlexColumn>
    </FlexColumn>
  );
};
