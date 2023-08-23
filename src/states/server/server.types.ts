import type { AuthError, PostgrestError } from "@supabase/supabase-js";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { HasArgs } from "~/types";
import type { Database } from "~/types/database";

export type SupabaseError = AuthError | PostgrestError;

export type MutationOptions<T extends (args: Parameters<T>[0]) => Promise<void>> =
  HasArgs<T> extends true
    ? UseMutationOptions<Awaited<ReturnType<T>>, SupabaseError, Parameters<T>[0]>
    : UseMutationOptions<Awaited<ReturnType<T>>, SupabaseError>;

export type PickMutationOptions<
  T extends (args: Parameters<T>[0]) => Promise<void>,
  O extends keyof MutationOptions<T>
> = Pick<MutationOptions<T>, O>;

export type Table = Database["public"]["Tables"];
