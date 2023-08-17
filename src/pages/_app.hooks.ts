import { useRouter } from "next/router";
import { useMount } from "react-use";
import { useAuthStore } from "~/states/client";
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
    } = supabase.auth.onAuthStateChange((_, currentSession) => {
      const isNotValidSession = session?.access_token !== currentSession?.access_token;

      if (isNotValidSession) router.reload();
    });

    updateSession({ isLoading: true });

    return () => {
      subscription.unsubscribe();
    };
  });
};
