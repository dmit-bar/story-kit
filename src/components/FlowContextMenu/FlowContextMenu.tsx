import { ContextMenu } from "@radix-ui/themes";
import { useFlowStore } from "@store/flowStore";
import {
  MouseEventHandler,
  PropsWithChildren,
  RefObject,
  forwardRef,
  useRef,
} from "react";
import { Node, useReactFlow } from "reactflow";

interface Props {
  handleClick?: () => void;
  flowWrapperRef: RefObject<HTMLDivElement>;
  menuPosition: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
}

const FlowContextMenu = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  (
    { menuPosition, flowWrapperRef, children }: PropsWithChildren<Props>,
    ref
  ) => {
    const { addNode } = useFlowStore();
    const { project } = useReactFlow();
    const contextRef = useRef<HTMLDivElement>(null);

    const handleAddNewNode: MouseEventHandler<HTMLDivElement> = (event) => {
      if (flowWrapperRef.current) {
        const flowWrapperBounds =
          flowWrapperRef.current.getBoundingClientRect();

        // translate mouse position to graph position
        const position = project({
          x: event.clientX - flowWrapperBounds.left - 200,
          y: event.clientY - flowWrapperBounds.top,
        });

        const newNode: Node = {
          id: "uniq-" + new Date().getTime(),
          type: "storyNode", // TODO TS
          data: { label: "123" },
          position,
        };

        addNode(newNode);
      }
    };

    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger ref={ref}>
          <div>{children}</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content
          ref={contextRef}
          style={{ position: "absolute", ...menuPosition, width: "200px" }}
        >
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>New node</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item shortcut="⌘ N" onClick={handleAddNewNode}>
                Story Node
              </ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
          <ContextMenu.Separator />
          {/* <ContextMenu.Item shortcut="⌘ ⌫" color="red" disabled>
            Delete
          </ContextMenu.Item> */}
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  }
);

export { FlowContextMenu };
