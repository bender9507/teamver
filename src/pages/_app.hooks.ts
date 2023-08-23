import { useRouter } from "next/router";
import { useMount } from "react-use";
import { routes } from "~/constants/routes";
import { useAuthStore } from "~/states/client";
import { getProfile } from "~/states/server";
import { supabase } from "~/states/server/config";

export const useApp = () => {
  const router = useRouter();

  const updateSession = useAuthStore((state) => state.updateSession);

  useMount(async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (session) {
      updateSession({ user: session.user });
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (state, currentSession) => {
      const isNotValidSession = session?.access_token !== currentSession?.access_token;

      if (isNotValidSession) router.reload();

      if (state === "SIGNED_IN") {
        const profile = await getProfile(currentSession?.user.id ?? "");

        if (profile) router.replace(routes.home);
        else router.replace(routes.welcome);
      }
    });

    updateSession({ isLoading: false });

    return () => {
      subscription.unsubscribe();
    };
  });
};
