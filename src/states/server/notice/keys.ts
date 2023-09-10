const NOTICE_KEY = "NOTICE";

export const noticeKeys = {
  selectNoticeMember: (myId: string) => [NOTICE_KEY, "selectNoticeMember", myId] as const,
  selectNoticeOwner: (myId: string) => [NOTICE_KEY, "selectNoticeOwner", myId] as const,
  selectNoticeCountMember: (myId: string) => [NOTICE_KEY, "selectNoticeCountMember", myId] as const,
  selectNoticeCountOwner: (myId: string) => [NOTICE_KEY, "selectNoticeCountOwner", myId] as const
} as const;
