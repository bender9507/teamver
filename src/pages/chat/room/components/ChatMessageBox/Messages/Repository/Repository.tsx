import dayjs from "dayjs";
import Link from "next/link";
import { Icon } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useRepository } from "./Repository.hooks";

export const Repository = ({ repoUrl }: { repoUrl: string }) => {
  const app = useRepository({ repoUrl });

  return (
    <FlexColumn ref={app.repoRef}>
      {app.repo && (
        <FlexColumn gap={12}>
          <Link href={app.repo.html_url} target="_blank">
            <Text size="textLarge">{app.repo.name}</Text>
          </Link>

          {app.repo.description && (
            <Text as="p" size="textMedium" color="gray9">
              {app.repo.description}
            </Text>
          )}

          {app.repo.homepage && (
            <Link href={app.repo.homepage} target="_blank">
              <Text size="textMedium" color="gray6">
                {app.repo.homepage}
              </Text>
            </Link>
          )}

          <Flex justify="between">
            <Text size="textMedium" color="gray9">
              {dayjs(app.repo.created_at).format("YYYY. MM. DD")}
            </Text>

            <Flex justify="end" align="end" gap={4}>
              <Icon name="star" color="success" width={15} height={15} />

              <Text size="textSmall">{app.repo.stargazers_count}</Text>
            </Flex>
          </Flex>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};
