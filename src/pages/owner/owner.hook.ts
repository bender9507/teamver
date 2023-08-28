import { useMemo, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "~/components/Commons";
import { useImmutableState } from "~/hooks";

import { useGetConstantQuery } from "~/states/server/constant";
import { useInsertFollowMutate, useSelectRecommendedProfilesQuery } from "~/states/server/profile";
import type Owner from "./index.page";
import type { FilterForm } from "./owner.types";

const SEED = Math.random();

export const useOwner = ({ user }: ComponentProps<typeof Owner>) => {
  const [selectedProfiles, setSelectedProfiles] = useImmutableState<Record<string, boolean>>({});

  const [filter, setFilter] = useImmutableState<FilterForm>({
    positions: [],
    languages: [],
    skills: []
  });

  const { register, handleSubmit, watch } = useForm<FilterForm>();

  const { mount, unmount } = useModal();
  const { data: constants } = useGetConstantQuery(["positions", "skills", "languages"]);
  const { data: randomProfiles } = useSelectRecommendedProfilesQuery({
    seedValue: SEED,
    userId: user.id,
    ...filter
  });
  const { mutate: insertFollowMutate } = useInsertFollowMutate();

  const filteredRandomProfiles = useMemo(
    () =>
      randomProfiles?.pages
        .map((page) => page.data)
        .flat()
        .filter((profile) => !selectedProfiles[profile.id])
        .reverse() ?? [],
    [randomProfiles?.pages, selectedProfiles]
  );

  const handleConfirm = (profileId: string) => {
    setSelectedProfiles({ [profileId]: true });

    insertFollowMutate({ myId: user.id, opponentId: profileId });
  };

  const handleCancel = (profileId: string) => {
    setSelectedProfiles({ [profileId]: true });
  };

  const handleChangeFilter = handleSubmit(({ languages, skills, positions }) => {
    setFilter({ languages: languages ?? [], skills: skills ?? [], positions: positions ?? [] });

    unmount("selectPositions");
    unmount("selectLanguages");
    unmount("selectSkills");
  });

  return {
    mount,
    filter,
    watch,
    register,
    constants,
    filteredRandomProfiles,
    handleConfirm,
    handleCancel,
    handleChangeFilter
  };
};
