import type { Database } from "~/types/database";

export type Table = Database["public"]["Tables"];

export type ProfileTable = Table["profiles"];
export type ProfileRow = ProfileTable["Row"];

export type ReviewTable = Table["reviews"];
export type ReviewRow = ReviewTable["Row"];
