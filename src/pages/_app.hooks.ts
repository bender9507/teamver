import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMount } from "react-use";
import { supabase } from "~/states/server/config";

export const useApp = () => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  const router = useRouter();

  useMount(() => {
    supabase.auth.onAuthStateChange((state) => {
      switch (state) {
        case "SIGNED_IN":
        case "SIGNED_OUT":
          return router.reload();

        default:
      }
    });
  });

  return {
    supabaseClient
  };
};
