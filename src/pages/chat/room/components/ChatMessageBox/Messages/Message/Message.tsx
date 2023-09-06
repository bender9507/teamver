import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { memo } from "react";
import { MyEmoji, MyMessage } from "../My";
import { NoticeMessage } from "../NoticeMessage";
import { OpponentEmoji, OpponentMessage } from "../Opponent";
import type { OpponentProps } from "../Opponent/Opponent.types";

export const Message = memo((props: OpponentProps) => {
  const { message } = props;

  const user = useUser() as User;

  const isMine = message.sender.id === user.id;

  switch (message.type) {
    case "NOTICE":
      return <NoticeMessage message={message} />;

    case "REPOSITORY":
      return <div>repository</div>;

    case "EMOJI":
      if (isMine) {
        return <MyEmoji {...props} />;
      }

      return <OpponentEmoji {...props} />;

    default:
      if (isMine) {
        return <MyMessage {...props} />;
      }

      return <OpponentMessage {...props} />;
  }
});
