import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useModal } from "~/components/Commons";
import {
  chatKeys,
  useInsertChatRequestMutate,
  useSelectChatRequestsQuery
} from "~/states/server/chat";
import { useSelectFollows } from "~/states/server/profile";

export const useOwner = (userId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: follows } = useSelectFollows(userId);
  const { data: requests } = useSelectChatRequestsQuery({ requesterId: userId, state: "PENDING" });
  const { mount } = useModal();

  const filteredData = {
    positions: [],
    languages: [],
    skills: [],
    areas: []
  };

  const { mutate: insertChatRequestMutate } = useInsertChatRequestMutate({
    onSuccess: () =>
      queryClient.invalidateQueries(
        chatKeys.selectChatRequests({ requesterId: userId, state: "PENDING" })
      )
  });

  const handleBack = () => {
    router.back();
  };

  const handleChatRequest = (receiverId: string) => {
    if (requests.findIndex((el) => el.receiverProfile.id === receiverId) === -1) {
      insertChatRequestMutate({ requesterId: userId, receiverId });
    } else {
    }
  };

  return { follows, requests, filteredData, mount, handleBack, handleChatRequest };
};
