import { useUser } from "@supabase/auth-helpers-react";
import type { User } from "@supabase/supabase-js";
import { useTranslation } from "next-i18next";
import type { ComponentProps, FormEvent } from "react";
import { useState } from "react";
import { useDialog, useModal } from "~/components/Commons";
import { useInsertNoticeMember } from "~/states/server/notice";
import { useInsertProjectInviteMutate, useSelectOwnerProjectsQuery } from "~/states/server/project";
import type { Invite } from ".";
import { INVITE_MODAL } from ".";

export const useInvite = ({ opponent }: ComponentProps<typeof Invite>) => {
  const [selected, setSelected] = useState<number>();

  const user = useUser() as User;
  const { t } = useTranslation("chat");
  const { toast } = useDialog();
  const { unmount } = useModal();

  const { data: projects } = useSelectOwnerProjectsQuery(user.id);

  const { mutate: insertNoticeMemberMutate } = useInsertNoticeMember();

  const { mutate: projectInviteMutate } = useInsertProjectInviteMutate({
    onSuccess: () => {
      insertNoticeMemberMutate({
        receiverId: opponent.id,
        requesterId: user.id,
        state: "TeamRequest"
      });
      toast({ type: "success", message: t("프로젝트에 초대했어요") });
    },
    onError: (error) => {
      toast({ type: "error", message: t(error.message) });
    }
  });

  const handleInvite = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!selected) return;

    projectInviteMutate({ projectId: selected, receiverId: opponent.id, requesterId: user.id });

    unmount(INVITE_MODAL);
  };

  const inRecruit = projects.filter((project) => project.state === "IN_RECRUIT");

  return {
    handleInvite,
    selected,
    setSelected,
    unmount,
    projects,
    inRecruit
  };
};
