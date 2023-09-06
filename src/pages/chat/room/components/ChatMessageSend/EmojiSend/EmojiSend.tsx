import Image from "next/image";
import { RatioBox } from "~/components/Commons";
import type { ChatMessageInsert } from "~/states/server/chat";
import { useSelectConstantsQuery } from "~/states/server/constant";
import { Grid } from "~/styles/mixins";

export const EMOJI_SEND_MODAL = "EMOJI_SEND_MODAL";

export const EmojiSend = ({
  onSend
}: {
  onSend: (message: string, type: ChatMessageInsert["type"]) => void;
}) => {
  const { data: constants } = useSelectConstantsQuery();

  return (
    <Grid column={4} padding={16} gap={16}>
      {constants.emojis.map(({ id, emoji }) => (
        <button key={id} type="button" onClick={() => onSend(emoji, "EMOJI")}>
          <RatioBox>
            <Image src={emoji} alt="이모티콘" fill style={{ objectFit: "cover" }} />
          </RatioBox>
        </button>
      ))}
    </Grid>
  );
};
