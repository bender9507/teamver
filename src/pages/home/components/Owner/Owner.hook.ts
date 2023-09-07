import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useModal } from "~/components/Commons";
import { useCardSelect, useImmutableState } from "~/hooks";

import { useInsertFollowMutate, useSelectRecommendedProfilesQuery } from "~/states/server/profile";
import type { FilterForm } from "./Owner.types";

const SEED = Math.random();

export const useOwner = () => {
  const [filter, setFilter] = useImmutableState<FilterForm>({
    positions: [],
    languages: [],
    skills: [],
    areas: []
  });

  const user = useUser() as User;
  const { mount } = useModal();

  const { data: randomProfiles, fetchNextPage } = useSelectRecommendedProfilesQuery({
    seedValue: SEED,
    userId: user.id,
    ...filter
  });

  const {
    filteredCards: filteredRandomProfiles,
    handleAccept,
    handleReject,
    handleRestore
  } = useCardSelect(randomProfiles?.pages.map((page) => page.data).flat() ?? [], (profileId) =>
    insertFollowMutate({ myId: user.id, opponentId: profileId as string })
  );

  const { mutate: insertFollowMutate } = useInsertFollowMutate();

  const handleChangeFilter = (key: string, values?: number[]) => {
    setFilter({ [key]: values });
  };

  useEffect(() => {
    if (filteredRandomProfiles.length <= 1) {
      fetchNextPage();
    }
  }, [fetchNextPage, filteredRandomProfiles.length]);

  return {
    mount,
    filter,
    filteredRandomProfiles,
    handleAccept,
    handleReject,
    handleRestore,
    handleChangeFilter
  };
};
