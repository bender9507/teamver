import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createContext, useContext } from "react";
import type { ChatMessageData } from "~/states/server/chat";
import { chatKeys, selectChatMessages, selectChatRoom, selectOpponent } from "~/states/server/chat";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { profileKeys, selectProfile } from "~/states/server/profile";
import { requireAuthentication } from "~/utils";
import { useRoom } from "./Room.hooks";
import { Member, Owner } from "./components";

const RoomContext = createContext<{
  roomId: string;
  profile: ProfileAllDataRow;
  opponent: ProfileAllDataRow | null;
  messages: ChatMessageData[];
  addMessage: (message: string, profile: ProfileAllDataRow) => void;
} | null>(null);

const Room = () => {
  const app = useRoom();

  return (
    <RoomContext.Provider value={app.values}>
      {app.profile.role.id === 1 ? <Owner /> : <Member />}
    </RoomContext.Provider>
  );
};

export default Room;

export const useRoomContext = () => {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error("useRoomContext is only available within Room");
  }

  return context;
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    const queryClient = new QueryClient();

    const roomId = context.query.roomId as string;

    const profile = queryClient.prefetchQuery(profileKeys.selectProfile(session.user.id), () =>
      selectProfile(session.user.id)
    );

    const room = queryClient.prefetchQuery(
      chatKeys.selectChatRoom({ roomId, userId: session.user.id }),
      () => selectChatRoom({ roomId, userId: session.user.id })
    );

    const messages = queryClient.prefetchQuery(chatKeys.selectChatMessages(Number(roomId)), () =>
      selectChatMessages(Number(roomId))
    );

    const opponent = queryClient.prefetchQuery(
      chatKeys.selectOpponent({ roomId, userId: session.user.id }),
      () => selectOpponent({ roomId, userId: session.user.id })
    );

    await Promise.all([profile, opponent, room, messages]);

    return {
      props: {
        session,
        dehydratedState: dehydrate(queryClient),
        ...(await serverSideTranslations(context.locale as string, ["common", "chat"]))
      }
    };
  }
);
