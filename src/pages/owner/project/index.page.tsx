import Link from "next/link";
import { Card } from "~/components/Owner/Card";
import { FlexColumn, Text } from "~/styles/mixins";

const Project = () => {
  //   const app = useProject();

  return (
    <>
      <Text>프로젝트 사진 영역</Text>

      <div>
        <Text>진행중인 프로젝트</Text>
        <FlexColumn gap={16}>
          {app.projects
            .filter((project) => project.projects.state === "IN_RECRUIT")
            .map((project) => (
              <Card key={project.projects.id} {...project} />
            ))}
        </FlexColumn>
      </div>
      <div>
        <Text>모집중인 프로젝트</Text>
        <FlexColumn gap={16}>
          {app.projects
            .filter((project) => project.projects.state === "DONE_RECRUIT")
            .map((project) => (
              <Card key={project.projects.id} {...project} />
            ))}
        </FlexColumn>
      </div>
      <div>
        <Text>끝난 프로젝트</Text>
        <FlexColumn gap={16}>
          {app.projects
            .filter((project) => project.projects.state === "DONE_PROJECT")
            .map((project) => (
              <Card key={project.projects.id} {...project} />
            ))}
        </FlexColumn>

        <Link href="/owner/project/create">클릭</Link>
      </div>
    </>
  );
};

export default Project;

// export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
//   const queryClient = new QueryClient();
//   const ownerId = query.ownerId as string;

//   await queryClient.prefetchQuery({
//     queryKey: projectsKey.getProjects(ownerId),
//     queryFn: () => getOwnerProjects(ownerId)
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       ...(await serverSideTranslations(locale, ["common", "home"]))
//     }
//   };
// };
