import { useRouter } from "next/router";
import { useState, type ComponentProps } from "react";
import { useSelectProfileQuery } from "~/states/server/profile";
import { useSelectMemberProjectsQuery } from "~/states/server/project";
import type { Member } from "./Member";

export const useMember = ({ user }: ComponentProps<typeof Member>) => {
  const [selectedTab, setSelectedTab] = useState("IN_PROJECT");

  const router = useRouter();

  const userId = router.query.userId as string;

  const { data: profile } = useSelectProfileQuery(userId);
  const { data: projects } = useSelectMemberProjectsQuery(userId);

  const isMine = userId === user.id;

  const inProjects = projects.filter((project) => project.state !== "DONE_PROJECT");
  const doneProjects = projects.filter((project) => project.state === "DONE_PROJECT");

  return {
    profile,
    projects,
    isMine,
    inProjects,
    doneProjects,
    selectedTab,
    setSelectedTab
  };
};
