import { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  FitViewOptions,
  MiniMap,
  Panel,
} from "reactflow";

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { rfSelector, useFlowStore } from "@store/flowStore";
import { useThemeStore } from "@store/themeStore";
import { FlowContextMenu, NodeType, customNodeTypes } from "..";
import "./Flow.module.css";

const Flow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowStore(rfSelector);
  const { isDark, onThemeChange } = useThemeStore();
  const flowRef = useRef<HTMLDivElement>(null);
  const flowWrapperRef = useRef<HTMLDivElement>(null);
  const flowContextMenuRef = useRef<HTMLDivElement>(null);

  const [menuPosition, setMenuPosition] = useState({});

  const handleSwitchTheme = () => {
    onThemeChange(!isDark);
  };

  const handleOpenContextMenu = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();

      const contextMenuEvent = new MouseEvent("contextmenu", { bubbles: true });

      if (flowContextMenuRef.current) {
        flowContextMenuRef.current.dispatchEvent(contextMenuEvent);
      }

      if (flowRef.current) {
        // TODO некорректно работает
        const pane = flowRef.current.getBoundingClientRect();
        setMenuPosition({
          top: event.clientY < pane.height - 200 && event.clientY,
          left: event.clientX < pane.width - 200 && event.clientX,
          right:
            event.clientX >= pane.width - 200 && pane.width - event.clientX,
          bottom:
            event.clientY >= pane.height - 200 && pane.height - event.clientY,
        });
      }
    },
    []
  );

  const nodeTypes: NodeType = useMemo<NodeType>(() => customNodeTypes, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        ref={flowRef}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneContextMenu={handleOpenContextMenu}
        fitView
        fitViewOptions={fitViewOptions}
      >
        <div ref={flowWrapperRef}>
          <FlowContextMenu
            ref={flowContextMenuRef}
            flowWrapperRef={flowWrapperRef}
            menuPosition={menuPosition}
          >
            <Controls className="flow-controls" />
            <MiniMap zoomable pannable />
            <Panel position="top-right">
              <IconButton highContrast color="gray" onClick={handleSwitchTheme}>
                {isDark ? <MoonIcon /> : <SunIcon />}
              </IconButton>
            </Panel>
            <Background
              variant={BackgroundVariant.Dots}
              className="flow-background"
            />
          </FlowContextMenu>
        </div>
      </ReactFlow>
    </div>
  );
};

export { Flow };
