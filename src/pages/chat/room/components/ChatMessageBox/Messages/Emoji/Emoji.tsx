import Image from "next/image";
import { RatioBox } from "~/components/Commons";
import { SizeBox } from "~/styles/mixins";

export const Emoji = ({ emojiUrl }: { emojiUrl: string }) => {
  return (
    <SizeBox width={150} height={150}>
      <RatioBox>
        <Image src={emojiUrl} alt="이모티콘" sizes="100%" fill style={{ objectFit: "contain" }} />
      </RatioBox>
    </SizeBox>
  );
};
