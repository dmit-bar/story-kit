import { Card, Flex, Text, TextArea } from "@radix-ui/themes";
import { useTextAreaAutosizer } from "@utils/hooks/textAreaAutosizer";

import { ChangeEvent, useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

const StoryNode = () => {
  const [value, setValue] = useState("");
  const { textAreaRef } = useTextAreaAutosizer(value);

  const onChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(evt.target.value);

    setValue(evt.target.value);
  }, []);

  return (
    <>
      <Card style={{ width: 500 }}>
        <Flex gap={"2"} direction={"column"} p={"2"}>
          <Text size="2" weight="bold">
            Story
          </Text>
          <TextArea
            ref={textAreaRef}
            placeholder="What happens here?"
            onChange={onChange}
            className="nodrag"
          />
        </Flex>
      </Card>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
    </>
  );
};

export { StoryNode };
