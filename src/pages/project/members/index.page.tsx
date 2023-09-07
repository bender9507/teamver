import type { User } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SwitchCase } from "~/components/Utils";
import { useSelectProfileQuery } from "~/states/server/profile";
import { requireAuthentication } from "~/utils";
import { Member, Owner } from ".";

const ProjectMembers = () => {
  const user = useUser() as User;
  const { data: profile } = useSelectProfileQuery(user.id);

  return (
    <SwitchCase value={profile.role.en} caseBy={{ inviter: <Owner />, invitee: <Member /> }} />
  );
};

export default ProjectMembers;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale as string, ["common", "project"]))
      }
    };
  }
);
