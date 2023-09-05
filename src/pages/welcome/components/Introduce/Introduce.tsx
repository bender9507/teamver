import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import { useMount } from "react-use";
import { Textarea } from "~/components/Commons";
import { FlexColumn, Text } from "~/styles/mixins";
import { useWelcomeContext } from "../../index.page";

export const Introduce = () => {
  const [textareaMaxHeight, setTextareaMaxHeight] = useState(0);

  const {
    welcomeForm: { register }
  } = useWelcomeContext();

  const { t } = useTranslation("welcome");

  const containerRef = useRef<HTMLDivElement>(null);

  useMount(() => {
    if (containerRef.current) {
      const _height = [...containerRef.current.childNodes].reduce((height, node) => {
        const element = node as HTMLElement;

        return element.tagName === "TEXTAREA" ? height : height - element.offsetHeight;
      }, containerRef.current.offsetHeight - 14);

      setTextareaMaxHeight(_height);
    }
  });

  return (
    <FlexColumn gap={70} flex={1}>
      <FlexColumn gap={16}>
        <Text as="h3" size="titleLarge">
          {t("멋진 소개글을 적어볼까요")}
        </Text>

        <Text as="p" size="textSmallBold" color="gray9">
          {t("프로필에 표시되는 소개글로 언제든 변경 가능해요")}
        </Text>
      </FlexColumn>

      <FlexColumn gap={14} flex={1} ref={containerRef} style={{ overflow: "hidden" }}>
        <Textarea
          {...register("introduce", { required: true, maxLength: 500 })}
          maxLength={500}
          maxHeight={textareaMaxHeight}
          placeholder={t("내 소개")}
        />

        <Text color="gray4" size="textMediumBold" style={{ marginLeft: "18px" }}>
          {t("최대 N자", { count: 500 })}
        </Text>
      </FlexColumn>
    </FlexColumn>
  );
};
