import { PROFILE_ALL_DATA_QUERY } from "../profile/constants";

export const CHAT_ROOM_ALL_DATA_QUERY = `
    id,
    members:chatMembers(...userId(${PROFILE_ALL_DATA_QUERY})),
    messages:chatMessages(id, message, createdAt, state,sender: senderId(${PROFILE_ALL_DATA_QUERY}))
`;
