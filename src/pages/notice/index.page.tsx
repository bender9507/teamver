import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import type { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { TitleHeader } from "~/components/Shared";
import type { ChatRequestMemberRow } from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import { noticeKeys } from "~/states/server/notice/keys";
import { useInsertNoticeMember } from "~/states/server/notice/mutations";
import { useSelectNoticeMemberQuery } from "~/states/server/notice/queries";
import { Flex, FlexColumn, LayoutContent, LayoutHeader, Text } from "~/styles/mixins";
import { isEmpty, requireAuthentication } from "~/utils";

const Notice = () => {
  const user = useUser() as User;
  const queryClient = useQueryClient();
  const { t } = useTranslation("notice");
  const { data } = useSelectNoticeMemberQuery(user.id);

  const { mutate: insertNoticeMemberMutate } = useInsertNoticeMember({
    onSuccess: () => {
      queryClient.invalidateQueries(noticeKeys.selectNoticeMember(user.id));
    }
  });

  // const requestNotice = (payload: RealtimePostgresInsertPayload<FollowProjectRow>) => {
  //   console.log(payload);

  //   insertNoticeMemberMutate({
  //     receiverId: user.id,
  //     requesterId: payload.new.followerId,
  //     state: "ChatRequest"
  //   });
  // };

  useEffect(() => {
    const notice = supabase
      .channel("notice")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatRequestMember",
          filter: `receiverId=eq.${user.id}`
        },
        (payload: RealtimePostgresInsertPayload<ChatRequestMemberRow>) => {
          console.log(payload);

          insertNoticeMemberMutate({
            receiverId: user.id,
            requesterId: payload.new.requesterId,
            state: "ChatRequest"
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notice);
    };
  }, [insertNoticeMemberMutate, user.id]);

  return (
    <LayoutHeader>
      <TitleHeader title={t("받은 알림 목록")} />

      <LayoutContent>
        {isEmpty(data) && <Text>알림이 없다</Text>}
        <FlexColumn>
          {data.map((notice) => (
            <Flex key={notice.id}>
              <Text>{notice.state}</Text>
            </Flex>
          ))}
        </FlexColumn>
      </LayoutContent>
    </LayoutHeader>
  );
};

export default Notice;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale as string, ["notice"]))
      }
    };
  }
);
