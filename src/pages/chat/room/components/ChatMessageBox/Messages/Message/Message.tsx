import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { memo } from "react";
import type { ChatMessageData } from "~/states/server/chat";
import { MyMessage, OpponentMessage } from "..";

export const Message = memo(
  ({ message, isChaining }: { message: ChatMessageData; isChaining: boolean }) => {
    const user = useUser() as User;

    const isMine = message.sender.id === user.id;

    switch (message.type) {
      case "NOTICE":
        return <div>notice</div>;

      case "REPOSITORY":
        return <div>repository</div>;

      case "EMOJI":
        return <div>emoji</div>;

      default:
        if (isMine) {
          return <MyMessage key={message.id} message={message} />;
        }

        return <OpponentMessage key={message.id} message={message} isChaining={isChaining} />;
    }
  }
);
