import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useMount } from "react-use";
import { supabase } from "~/states/server/config";

export const useApp = () => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  useMount(() => {
    supabase.auth.onAuthStateChange((state) => {
      switch (state) {
        default:
      }
    });
  });

  return {
    supabaseClient
  };
};
