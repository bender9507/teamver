import Link from "next/link";
import { routes } from "~/constants/routes";
import { FlexColumn, Text } from "~/styles/mixins";

const Project = () => {
  return (
    <FlexColumn>
      <Text>프로젝트 관리 페이지</Text>

      <Link href={routes.home}>홈으로</Link>
    </FlexColumn>
  );
};

export default Project;
