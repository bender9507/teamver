import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";
import { Avatar, Icon } from "~/components/Commons";
import { noticeKeys, useUpdateNoticeMember, useUpdateNoticeOwner } from "~/states/server/notice";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { useNoticeList } from "./NoticeList.hooks";
import * as Styled from "./NoticeList.styles";

export const NoticeList = ({ role }: { role: number }) => {
  const app = useNoticeList(role);
  const { t } = useTranslation("notice");
  const [isDelete] = useState(false);

  const { mutate: updateNoticeMemberMutate } = useUpdateNoticeMember({
    onSuccess: () => {
      app.queryClient.invalidateQueries(noticeKeys.selectNoticeMember(app.user.id));
    }
  });
  const { mutate: updateNoticeOwnerMutate } = useUpdateNoticeOwner({
    onSuccess: () => {
      app.queryClient.invalidateQueries(noticeKeys.selectNoticeOwner(app.user.id));
    }
  });

  const handleNoticeClick = (id: number) => {
    if (role === 1) {
      updateNoticeOwnerMutate({ id });
    } else {
      updateNoticeMemberMutate({ id });
    }
  };

  return (
    <>
      {isEmpty(app.noticeData) && <Text>{t("알림이 없습니다")}</Text>}

      <FlexColumn>
        {app.noticeData.map((notice) => (
          <Link href="/chat" key={notice.id}>
            <Styled.Card isRead={notice.isRead} onClick={() => handleNoticeClick(notice.id)}>
              <Flex justify="between">
                <Flex align="center">
                  <Avatar src={notice.requesterProfile.imageUrl} />

                  <Text
                    color="content2"
                    size="textMedium"
                    lineHeight="24px"
                    style={{ marginLeft: "8px" }}
                  >
                    {app.noticeCase({
                      state: notice.state,
                      requester: notice.requesterProfile.name
                    })}{" "}
                    지금 눌러서 확인해 보세요!
                  </Text>
                </Flex>
                {isDelete && (
                  <Flex style={{ margin: "0 22px 0 22px", alignSelf: "start" }}>
                    <Icon name="close" />
                  </Flex>
                )}
              </Flex>

              <Text color="gray6" style={{ marginLeft: "58px" }} size="textSmallBold">
                {app.elapsedTimeFormat({ date: notice.createdAt, now: app.nowTime })}
              </Text>
            </Styled.Card>
          </Link>
        ))}
      </FlexColumn>
    </>
  );
};
