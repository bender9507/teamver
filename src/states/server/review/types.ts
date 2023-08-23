import type { Table } from "../server.types";

type ReviewTable = Table["reviews"];
export type ReviewRow = ReviewTable["Row"];

type ProfileTable = Table["profiles"];
export type ProfileRow = ProfileTable["Row"];

type ReactionTable = Table["constantReactions"]["Row"];
export type ReactionItem = Pick<ReactionTable, "ko">;
