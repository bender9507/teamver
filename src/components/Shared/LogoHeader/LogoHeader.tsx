import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useMount } from "react-use";
import { Icon } from "~/components/Commons";
import { supabase } from "~/states/server/config";
import {
  noticeKeys,
  useSelectNoticeCountMemberQuery,
  useSelectNoticeCountOwnerQuery
} from "~/states/server/notice";
import { Position } from "~/styles/mixins";
import * as Styled from "./LogoHeader.styles";

export const LogoHeader = ({ role }: { role: number }) => {
  const user = useUser() as User;
  const queryClient = useQueryClient();
  const { data: memberCount } = useSelectNoticeCountMemberQuery(user.id);
  const { data: ownerCount } = useSelectNoticeCountOwnerQuery(user.id);

  useMount(() => {
    const noticeCount = supabase
      .channel("noticeCount")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "noticeMember",
          filter: `receiverId=eq.${user.id}`
        },
        () => {
          queryClient.invalidateQueries(noticeKeys.selectNoticeCountMember(user.id));
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "noticeOwner",
          filter: `receiverId=eq.${user.id}`
        },
        () => {
          queryClient.invalidateQueries(noticeKeys.selectNoticeCountOwner(user.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(noticeCount);
    };
  });

  return (
    <Styled.Header>
      <Image src="/images/teamver.png" width={58} height={21} alt="teamver" />
      <Link href="/notice">
        <Position position="relative">
          <Icon name="bell" />
          {role === 1
            ? !!ownerCount && (
                <Position position="absolute" style={{ top: "-7px", right: "-7px" }}>
                  <Icon name="circle" />
                </Position>
              )
            : !!memberCount && (
                <Position position="absolute" style={{ top: "-7px", right: "-7px" }}>
                  <Icon name="circle" />
                </Position>
              )}
        </Position>
      </Link>
    </Styled.Header>
  );
};
