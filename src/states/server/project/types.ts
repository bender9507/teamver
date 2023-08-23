import type { Database } from "~/types/database";

type Table = Database['public']['Tables']
type ProjectsTable = Table['projects']
export type ProjectsRow = ProjectsTable['Row']