import dayjs from "dayjs";
import Link from "next/link";
import { Icon } from "~/components/Commons";
import { useGetRepoQuery } from "~/states/server/github";
import { Flex, FlexColumn, Text } from "~/styles/mixins";

export const Repository = ({ repoUrl }: { repoUrl: string }) => {
  const { data: repo } = useGetRepoQuery(repoUrl);

  if (!repo) return;

  return (
    <Link href={repo.html_url} target="_blank">
      <FlexColumn gap={12}>
        <Text size="textLarge">{repo.name}</Text>

        {repo.description && (
          <Text as="p" size="textMedium" color="gray9">
            {repo.description}
          </Text>
        )}

        {repo.homepage && (
          <Link href={repo.homepage} target="_blank">
            <Text size="textMedium" color="gray6">
              {repo.homepage}
            </Text>
          </Link>
        )}

        <Flex justify="between">
          <Text size="textMedium" color="gray9">
            {dayjs(repo.created_at).format("YYYY. MM. DD")}
          </Text>

          <Flex justify="end" align="end" gap={4}>
            <Icon name="star" color="success" width={15} height={15} />

            <Text size="textSmall">{repo.stargazers_count}</Text>
          </Flex>
        </Flex>
      </FlexColumn>
    </Link>
  );
};
