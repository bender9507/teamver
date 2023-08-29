import { useRouter } from "next/router";
import { useState, type ComponentProps } from "react";
import { useSelectProfileQuery } from "~/states/server/profile";
import type { Member } from "./Member";

export const useMember = ({ user }: ComponentProps<typeof Member>) => {
  const [selectedTab, setSelectedTab] = useState("IN_PROJECT");

  const router = useRouter();

  const userId = router.query.userId as string;

  const { data: profile } = useSelectProfileQuery(userId);

  const isMine = userId === user.id;

  return {
    profile,
    isMine,
    selectedTab,
    setSelectedTab
  };
};
