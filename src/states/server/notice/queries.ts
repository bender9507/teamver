import { useQuery } from "@tanstack/react-query";
import { selectNoticeMember, selectNoticeOwner } from "./apis";
import { noticeKeys } from "./keys";

export const useSelectNoticeMemberQuery = (myId: string) => {
  return useQuery({
    queryKey: noticeKeys.selectNoticeMember(myId),
    queryFn: () => selectNoticeMember(myId),
    initialData: []
  });
};

export const useSelectNoticeOwnerQuery = (myId: string) => {
  return useQuery({
    queryKey: noticeKeys.selectNoticeOwner(myId),
    queryFn: () => selectNoticeOwner(myId),
    initialData: []
  });
};
