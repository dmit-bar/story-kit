import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { createWithEqualityFn } from "zustand/traditional";

type RFState = {
  nodes: Node[];
  edges: Edge[];
  addNode: (newNode: Node) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const useFlowStore = createWithEqualityFn<RFState>(
  (set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    addNode: (newNode: Node) => {
      set({
        nodes: [...get().nodes, newNode],
      });
    },
    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection: Connection) => {
      set({
        edges: addEdge(connection, get().edges),
      });
    },
  }),
  Object.is
);

const rfSelector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export { rfSelector, useFlowStore };
export type { RFState };
