import dayjs from "dayjs";
import { Icon } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useRepositorySend } from "./RepositorySend.hooks";
import * as Styled from "./RepositorySend.styles";

export const REPOSITORY_SEND_MODAL = "REPOSITORY_SEND_MODAL";

export const RepositorySend = () => {
  const app = useRepositorySend();

  return (
    <FlexColumn gap={12} padding={12}>
      {app.repos.map(
        ({
          id,
          name,
          description,
          stargazers_count: star,
          created_at: createdAt,
          homepage,
          url
        }) => (
          <Styled.RepositoryCard key={id} onClick={() => app.handleSendRepository(url)}>
            <Text size="titleSmall">{name}</Text>

            {description && (
              <Text size="textMedium" color="gray9">
                {description}
              </Text>
            )}

            {homepage && (
              <Text size="textMedium" color="gray6">
                {homepage}
              </Text>
            )}

            <Flex justify="between">
              <Text size="textMedium" color="gray9">
                {dayjs(createdAt).format("YYYY. MM. DD")}
              </Text>

              <Flex justify="end" align="end" gap={4}>
                <Icon name="star" color="success" width={20} height={20} />

                <Text size="textMedium">{star}</Text>
              </Flex>
            </Flex>
          </Styled.RepositoryCard>
        )
      )}
    </FlexColumn>
  );
};
