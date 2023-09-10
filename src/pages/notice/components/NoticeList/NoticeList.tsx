import { useTranslation } from "next-i18next";
import { Avatar, IconButton } from "~/components/Commons";

import { useSelectNoticeCountMemberQuery } from "~/states/server/notice";
import { Flex, FlexColumn, PosCenter, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { useNoticeList } from "./NoticeList.hooks";
import * as Styled from "./NoticeList.styles";

export const NoticeList = ({ role, isDelete }: { role: number; isDelete: boolean }) => {
  const app = useNoticeList({ role, isDelete });
  const { t } = useTranslation("notice");
  const { data } = useSelectNoticeCountMemberQuery(app.user.id);

  console.log(data);

  return (
    <>
      <PosCenter>
        {isEmpty(app.noticeData) && (
          <Text size="textMediumBold" color="gray6">
            {t("알림이 없습니다")}
          </Text>
        )}
      </PosCenter>

      <FlexColumn>
        {app.noticeData.map((notice) => (
          <Styled.Card
            isRead={notice.isRead}
            key={notice.id}
            onClick={() => app.handleNoticeClick({ id: notice.id, clicked: notice.isRead })}
          >
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
                  })}
                </Text>
              </Flex>

              {isDelete && (
                <Flex style={{ margin: "0 10px 0 22px", alignSelf: "start" }}>
                  <IconButton
                    name="close"
                    color="white"
                    onClick={() => app.handleDelete(notice.id)}
                  />
                </Flex>
              )}
            </Flex>

            <Text color="gray6" style={{ marginLeft: "58px" }} size="textSmallBold">
              {app.elapsedTimeFormat({ date: notice.createdAt, now: app.nowTime })}
            </Text>
          </Styled.Card>
        ))}
      </FlexColumn>
    </>
  );
};
