import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSelectOwnerProjectsQuery } from "~/states/server/project";
import { Text } from "~/styles/mixins";

const MY_ID = "d8b59089-521c-4c53-9483-8a0e70e3d42f";

const Member = () => {
  const { data } = useSelectOwnerProjectsQuery(MY_ID);
  console.log(data);
  return <Text>member</Text>;
};

export default Member;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"]))
    }
  };
};
