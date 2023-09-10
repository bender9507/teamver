import { useTranslation } from "next-i18next";
import { Avatar } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { useNoticeList } from "./NoticeList.hooks";

export const NoticeList = ({ role }: { role: number }) => {
  const app = useNoticeList(role);
  const { t } = useTranslation("notice");

  console.log(app.noticeData);

  return (
    <>
      {isEmpty(app.noticeData) && <Text>{t("알림이 없습니다")}</Text>}
      <FlexColumn>
        {app.noticeData.map((notice) => (
          <Flex align="center" padding="20px" key={notice.id}>
            <Avatar src={notice.requesterProfile.imageUrl} />
            <FlexColumn>
              <Text>
                {app.noticeCase({ state: notice.state, requester: notice.requesterProfile.name })}
              </Text>
              <Text>{notice.createdAt}</Text>
            </FlexColumn>
          </Flex>
        ))}
      </FlexColumn>
    </>
  );
};
