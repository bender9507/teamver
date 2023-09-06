import Image from "next/image";
import { RatioBox } from "~/components/Commons";
import { Grid } from "~/styles/mixins";
import { useEmojiSend } from "./EmojiSend.hooks";

export const EMOJI_SEND_MODAL = "EMOJI_SEND_MODAL";

export const EmojiSend = () => {
  const app = useEmojiSend();

  return (
    <Grid column={4} padding={16} gap={16}>
      {app.constants.emojis.map(({ id, emoji }) => (
        <button key={id} type="button" onClick={() => app.sendEmoji(emoji)}>
          <RatioBox>
            <Image src={emoji} alt="이모티콘" fill style={{ objectFit: "cover" }} />
          </RatioBox>
        </button>
      ))}
    </Grid>
  );
};
