const NOTICE_KEY = "NOTICE";

export const noticeKeys = {
  selectNoticeMember: (myId: string) => [NOTICE_KEY, "selectNoticeMember", myId] as const,
  selectNoticeOwner: (myId: string) => [NOTICE_KEY, "selectNoticeOwner", myId] as const
} as const;
