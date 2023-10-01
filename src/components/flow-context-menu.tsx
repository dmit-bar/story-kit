import { ContextMenu } from "@radix-ui/themes";
import { PropsWithChildren, forwardRef } from "react";

interface Props {
  handleClick?: () => void;
  menuPosition: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
}

const FlowContextMenu = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ menuPosition, children }: PropsWithChildren<Props>, ref) => {
    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger ref={ref}>{children}</ContextMenu.Trigger>
        <ContextMenu.Content
          style={{ position: "absolute", ...menuPosition, width: "200px" }}
        >
          <ContextMenu.Item shortcut="⌘ E">Edit</ContextMenu.Item>
          <ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item shortcut="⌘ N">Archive</ContextMenu.Item>

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>Move to project…</ContextMenu.Item>
              <ContextMenu.Item>Move to folder…</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Advanced options…</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>

          <ContextMenu.Separator />
          <ContextMenu.Item>Share</ContextMenu.Item>
          <ContextMenu.Item>Add to favorites</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item shortcut="⌘ ⌫" color="red">
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  }
);

export { FlowContextMenu };
