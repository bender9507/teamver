import { useState } from "react";
import { useMount } from "react-use";
import { IconButton } from "~/components/Commons";
import { supabase } from "~/states/server/config";
import { FlexColumn, Text } from "~/styles/mixins";

export const Notice = () => {
  const [isClick, setIsClick] = useState(false);

  useMount(() => {
    const notice = supabase
      .channel("notice")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "chatRequestMember" },
        (payload) => {
          console.log(payload);
        }
      );

    return () => {
      supabase.removeChannel(notice);
    };
  });

  return (
    <FlexColumn style={{ position: "relative" }}>
      <IconButton name="bell" onClick={() => setIsClick((prev) => !prev)} />
      <FlexColumn
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "100px",
          height: "300px",
          zIndex: 99,
          transform: "translate(50%, 100%)",
          backgroundColor: "red",
          display: `${isClick ? "flex" : "none"}`
        }}
      >
        <Text>Hi</Text>
      </FlexColumn>
    </FlexColumn>
  );
};
