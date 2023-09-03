import type { Session } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Database } from "~/types/database";

type GSSPWrapper = (
  context: GetServerSidePropsContext,
  session: Session
) => Promise<GetServerSidePropsResult<{ session: Session }>>;

export const requireAuthentication = (gssp: GSSPWrapper): GetServerSideProps => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<{ session: Session }>> => {
    const supabase = createPagesServerClient<Database>(context);

    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        redirect: {
          destination: "/",
          statusCode: 302
        }
      };
    }

    const response = await gssp(context, session);

    return response;
  };
};
