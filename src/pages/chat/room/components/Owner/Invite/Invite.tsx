import type { User } from "@supabase/supabase-js";
import type { ChangeEvent } from "react";
import { Avatar, Radio, RadioGroup } from "~/components/Commons";
import { useSelectOwnerProjectsQuery } from "~/states/server/project";
import { Text } from "~/styles/mixins";

export const Invite = ({
  user,
  onChange
}: {
  user: User;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { data: projects } = useSelectOwnerProjectsQuery(user.id);

  return (
    <RadioGroup
      name="project"
      onChange={onChange}
      containerProps={{ direction: "column", gap: 16, marginTop: 14 }}
    >
      {projects.map((project) => (
        <Radio key={project.id} value={project.id}>
          <Avatar size="small" src={project.imageUrl} />

          <Text width={130} ellipsis>
            {project.name}
          </Text>
        </Radio>
      ))}
    </RadioGroup>
  );
};
