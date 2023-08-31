import { useEffect, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "~/components/Commons";
import { useCardSelect, useImmutableState } from "~/hooks";

import { useSelectConstantsQuery } from "~/states/server/constant";
import { useInsertFollowMutate, useSelectRecommendedProfilesQuery } from "~/states/server/profile";
import type { Owner } from "./Owner";
import type { FilterForm } from "./Owner.types";

const SEED = Math.random();

export const useOwner = ({ user }: ComponentProps<typeof Owner>) => {
  const [filter, setFilter] = useImmutableState<FilterForm>({
    positions: [],
    languages: [],
    skills: [],
    areas: []
  });

  const { register, handleSubmit, watch } = useForm<FilterForm>();

  const { mount, unmount } = useModal();

  const { data: constants } = useSelectConstantsQuery();
  const { mutate: insertFollowMutate } = useInsertFollowMutate();
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

  const handleChangeFilter = handleSubmit(({ languages, skills, positions, areas }) => {
    setFilter({
      languages: languages || [],
      skills: skills || [],
      positions: positions || [],
      areas: areas || []
    });

    unmount("selectPositions");
    unmount("selectLanguages");
    unmount("selectSkills");
  });

  useEffect(() => {
    if (filteredRandomProfiles.length <= 1) {
      fetchNextPage();
    }
  }, [fetchNextPage, filteredRandomProfiles.length]);

  return {
    mount,
    filter,
    watch,
    register,
    constants,
    filteredRandomProfiles,
    handleAccept,
    handleReject,
    handleRestore,
    handleChangeFilter
  };
};
