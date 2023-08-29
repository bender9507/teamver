import { useRouter } from "next/router";
import { useState, type ComponentProps } from "react";
import { routes } from "~/constants/routes";
import { useSelectProfileQuery } from "~/states/server/profile";
import { useSelectOwnerProjectsQuery } from "~/states/server/project";
import type { Owner } from "./Owner";

export const useOwner = ({ user }: ComponentProps<typeof Owner>) => {
  const [selectedTab, setSelectedTab] = useState("IN_PROJECT");

  const router = useRouter();

  const userId = router.query.userId as string;

  const { data: profile } = useSelectProfileQuery(userId);
  const { data: projects } = useSelectOwnerProjectsQuery(userId);

  const isMine = userId === user.id;

  const handleProjectCreate = () => {
    router.push(routes.projectCreate);
  };

  return {
    profile,
    projects,
    isMine,
    selectedTab,
    setSelectedTab,
    handleProjectCreate
  };
};
