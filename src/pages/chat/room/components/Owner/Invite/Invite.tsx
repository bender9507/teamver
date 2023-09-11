import { useTranslation } from "next-i18next";
import { Avatar, Radio, RadioGroup } from "~/components/Commons";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { FlexCenter, FlexColumn, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { useInvite } from "./Invite.hooks";
import * as Styled from "./Invite.styles";

export const INVITE_MODAL = "INVITE_MODAL";

export const Invite = ({ opponent }: { opponent: ProfileAllDataRow }) => {
  const app = useInvite({ opponent });

  const { t } = useTranslation("chat");

  return (
    <FlexColumn as="form" onSubmit={app.handleInvite}>
      <FlexCenter direction="column" padding="25px">
        <Text size="textLarge">{t("어떤 프로젝트에 초대할까요")}</Text>

        <RadioGroup
          name="project"
          onChange={(event) => {
            app.setSelected(Number(event.target.value));
          }}
          containerProps={{ direction: "column", gap: 16, marginTop: 22 }}
        >
          {isEmpty(app.inRecruit) && (
            <Text size="textMedium" color="gray6">
              {t("프로젝트가 없어요")}
            </Text>
          )}

          {app.inRecruit.map((project) => (
            <Radio key={project.id} value={project.id}>
              <Avatar size="small" src={project.imageUrl} />

              <Text width={130} ellipsis>
                {project.name}
              </Text>
            </Radio>
          ))}
        </RadioGroup>
      </FlexCenter>

      <Styled.ButtonBox>
        <Styled.Button type="button" onClick={() => app.unmount(INVITE_MODAL)}>
          {t("취소")}
        </Styled.Button>

        <Styled.Button disabled={!app.selected}>{t("초대하기")}</Styled.Button>
      </Styled.ButtonBox>
    </FlexColumn>
  );
};
