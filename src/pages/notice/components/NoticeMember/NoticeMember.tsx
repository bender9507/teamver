import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { useNoticeMember } from "./NoticeMember.hooks";

export const NoticeMember = () => {
  const app = useNoticeMember();

  console.log(app.noticeData);

  return (
    <>
      {isEmpty(app.noticeData) && <Text>알림이 없다</Text>}
      <FlexColumn>
        {app.noticeData.map((notice) => (
          <Flex key={notice.id}>
            <Text>{notice.state}</Text>
          </Flex>
        ))}
      </FlexColumn>
    </>
  );
};
