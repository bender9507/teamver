import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "~/components/Commons";
import {
  useSelectNoticeCountMemberQuery,
  useSelectNoticeCountOwnerQuery
} from "~/states/server/notice";
import { Position } from "~/styles/mixins";
import * as Styled from "./LogoHeader.styles";

export const LogoHeader = ({ role }: { role: number }) => {
  const user = useUser() as User;

  const { data: memberCount } = useSelectNoticeCountMemberQuery(user.id);
  const { data: ownerCount } = useSelectNoticeCountOwnerQuery(user.id);

  return (
    <Styled.Header>
      <Image src="/images/teamver.svg" width={130} height={16} alt="teamver" />
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
