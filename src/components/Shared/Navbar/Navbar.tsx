import { useUser, type User } from "@supabase/auth-helpers-react";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Icon } from "~/components/Commons";
import { routes } from "~/constants/routes";
import {
  chatKeys,
  useSelectChatRoomsQuery,
  useSelectUnreadMessageCountQuery
} from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import { Position } from "~/styles/mixins";
import * as Styled from "./Navbar.styles";

export const Navbar = () => {
  const user = useUser() as User;
  const queryClient = useQueryClient();
  const { pathname } = useRouter();

  const { data: rooms } = useSelectChatRoomsQuery(user.id);
  const { data: unreadMessageCount } = useSelectUnreadMessageCountQuery(user.id);

  useEffect(() => {
    const roomIds = rooms.map((room) => room.id).join(", ");

    const subscribeMessage = supabase
      .channel(`unread_messages_${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chatMessages",
          filter: `roomId=in.(${roomIds})`
        },
        () => queryClient.invalidateQueries(chatKeys.selectUnreadMessageCount(user.id))
      )
      .subscribe();

    return () => {
      subscribeMessage.unsubscribe();
    };
  }, [queryClient, rooms, user.id]);

  return (
    <Styled.Navbar>
      <Link href={routes.main}>
        <Icon name={pathname.startsWith(routes.main) ? "homeFill" : "home"} />
      </Link>

      <Link href={routes.chat}>
        <Position position="relative">
          <Icon name={pathname.startsWith(routes.chat) ? "chatFill" : "chat"} />

          {!!unreadMessageCount && <Styled.UnreadCount>{unreadMessageCount}</Styled.UnreadCount>}
        </Position>
      </Link>

      <Link href={routes.like}>
        <Icon name={pathname.startsWith(routes.like) ? "likeFill" : "like"} />
      </Link>

      <Link href={{ pathname: routes.profile, query: { userId: user.id } }}>
        <Icon name={pathname.startsWith(routes.profile) ? "profileFill" : "profile"} />
      </Link>
    </Styled.Navbar>
  );
};
