import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "~/types/database";

const supabase = createPagesBrowserClient<Database>({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
});

export { supabase };
