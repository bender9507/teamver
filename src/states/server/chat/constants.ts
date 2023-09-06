import { PROFILE_ALL_DATA_QUERY } from "../profile/constants";

export const CHAT_MESSAGE_ALL_DATA_QUERY = `id, message, createdAt, state,sender: senderId(${PROFILE_ALL_DATA_QUERY})`;

export const CHAT_ROOM_ALL_DATA_QUERY = `
    id,
    members:chatMembers(...userId(${PROFILE_ALL_DATA_QUERY})),
    messages:chatMessages(${CHAT_MESSAGE_ALL_DATA_QUERY})
`;
