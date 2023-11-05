import { StoryNode } from "./StoryNode/StoryNode";

export type NodeType = Record<string, () => JSX.Element>;

const customNodeTypes: NodeType = {
  storyNode: StoryNode,
};

export { customNodeTypes };
