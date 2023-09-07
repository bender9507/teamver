import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { memo } from "react";
import { Emoji } from "../Emoji";
import * as Styled from "../Messages.styles";
import type { OpponentProps } from "../Messages.types";
import { MyBox } from "../MyBox";
import { OpponentBox } from "../OpponentBox";
import { Repository } from "../Repository";

export const Message = memo((props: OpponentProps) => {
  const {
    message: { message: content, sender, type }
  } = props;

  const user = useUser() as User;
  const { t } = useTranslation("chat");

  const isMine = sender.id === user.id;

  switch (type) {
    case "NOTICE":
      return <Styled.NoticeBubble>{t(content)}</Styled.NoticeBubble>;

    case "REPOSITORY":
      if (isMine) {
        return (
          <MyBox {...props}>
            <Styled.MyBubble>
              <Repository repoUrl={content} />
            </Styled.MyBubble>
          </MyBox>
        );
      }

      return (
        <OpponentBox {...props}>
          <Styled.OpponentBubble>
            <Repository repoUrl={content} />
          </Styled.OpponentBubble>
        </OpponentBox>
      );

    case "EMOJI":
      if (isMine) {
        return (
          <MyBox {...props}>
            <Emoji emojiUrl={content} />
          </MyBox>
        );
      }

      return (
        <OpponentBox {...props}>
          <Emoji emojiUrl={content} />
        </OpponentBox>
      );

    default:
      if (isMine) {
        return (
          <MyBox {...props}>
            <Styled.MyBubble>{content}</Styled.MyBubble>
          </MyBox>
        );
      }

      return (
        <OpponentBox {...props}>
          <Styled.OpponentBubble>{content}</Styled.OpponentBubble>
        </OpponentBox>
      );
  }
});
