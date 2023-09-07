import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelectMemberProjectsQuery } from "~/states/server/project";

export const useMember = () => {
  const [selectedTab, setSelectedTab] = useState("IN_PROJECT");

  const user = useUser() as User;
  const router = useRouter();

  const userId = router.query.userId as string;

  const { data: projects } = useSelectMemberProjectsQuery(userId);

  const isMine = userId === user.id;

  const inProjects = projects.filter((project) => project.state !== "DONE_PROJECT");
  const doneProjects = projects.filter((project) => project.state === "DONE_PROJECT");

  return {
    projects,
    isMine,
    inProjects,
    doneProjects,
    selectedTab,
    setSelectedTab
  };
};
