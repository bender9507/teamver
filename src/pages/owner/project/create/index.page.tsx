import { Text } from "~/styles/mixins";

const Create = () => {
  return (
    <>
      <Text>프로젝트 사진 영역</Text>

      <div>안녕</div>
    </>
  );
};

export default Create;

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
