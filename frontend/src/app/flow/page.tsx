"use client";
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  Power,
  X,
  Unplug,
  ExternalLink,
  Plus,
  Minus,
  Info,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateBotDialog, StopBotDialog } from "@/components/login";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { ModeToggle } from "@/components/modeswitch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { Handle, Position, ControlButton } from "@xyflow/react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toPng } from "html-to-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReactFlow } from "@xyflow/react";
import {
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeProps,
} from "@xyflow/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import io, { Socket } from "socket.io-client";
import e from "cors";
import { set } from "react-hook-form";
import { Panel, getNodesBounds, getViewportForBounds } from "@xyflow/react";
import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "@xyflow/react";
// @ts-ignore
function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  // Calculate the angle between source and target
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 45;

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <img
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px) rotate(${angle}deg)`,
            pointerEvents: "all",
            imageRendering: "pixelated",
            width: "3rem",
          }}
          className="nodrag nopan"
          src="https://minecraft.wiki/images/Invicon_Arrow.png"
          alt="Arrow"
        />
      </EdgeLabelRenderer>
    </>
  );
}
type Edge = {
  id: string;
  source: string;
  target: string;
};

const edgeTypes = {
  "custom-edge": CustomEdge,
};

interface NodeType {
  id: string;
  label: string;
  hasInput: boolean;
  description: string;
  inputLabel: string;
  inputType: string;
  author: string;
}

function downloadImage(dataUrl: any) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getNodesBounds(getNodes());
    // @ts-ignore
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );
    // @ts-ignore
    toPng(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#00000000",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  return (
    <Panel position="top-right">
      <button className="download-btn" onClick={onClick}>
        Download Image
      </button>
    </Panel>
  );
}

function animateCenter(
  reactFlowInstance: any,
  nodeId: string,
  duration = 1000,
  onComplete?: () => void
) {
  const startTime = Date.now();
  const startViewport = reactFlowInstance.getViewport();

  // Get the target viewport by using fitView
  console.log(reactFlowInstance.getNode(nodeId));
  reactFlowInstance.fitView({
    nodes: [reactFlowInstance.getNode(nodeId)],
    duration: 0,
    padding: 0.2,
  });
  const endViewport = reactFlowInstance.getViewport();

  // Reset to the starting viewport
  reactFlowInstance.setViewport(startViewport);

  function animate() {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out-cubic)
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    const currentX =
      startViewport.x + (endViewport.x - startViewport.x) * easeProgress;
    const currentY =
      startViewport.y + (endViewport.y - startViewport.y) * easeProgress;
    const currentZoom =
      startViewport.zoom +
      (endViewport.zoom - startViewport.zoom) * easeProgress;

    reactFlowInstance.setViewport({
      x: currentX,
      y: currentY,
      zoom: currentZoom,
    });

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else if (onComplete) {
      onComplete();
    }
  }

  requestAnimationFrame(animate);
}

const CustomNode = ({ data, id }: { data: any; id: string }) => {
  const [isInFocus, setIsInFocus] = useState(false);
  const isRunning = id === data.runningNodeId;

  useEffect(() => {
    // Reset focus state when node data changes
    setIsInFocus(false);
  }, [data.position.x, data.position.y]);

  const handleClick = (e: any) => {
    if (!(e.target instanceof HTMLInputElement) && !isInFocus) {
      console.log("Clicked on node", id);
      setIsInFocus(true);
      animateCenter(data.reactFlowInstance, id, 2000, () =>
        setIsInFocus(false)
      );
    }
  };

  return (
    <Card
      className={`custom-node ${isRunning ? "running-node" : ""}`}
      style={{
        maxWidth: "300px",
        overflowWrap: "break-word",
        borderColor: isRunning
          ? data.theme === "dark"
            ? "white"
            : "black"
          : undefined,
        borderWidth: isRunning ? "3px" : undefined,
      }}
      onClick={handleClick}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#555",
          width: "1rem",
          height: "1rem",
          borderRadius: "6px",
        }}
      />
      <CardHeader className="p-4">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span>{data.label}</span>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => data.onDelete(id)}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </CardTitle>
        <CardDescription className="text-xs">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {data.hasInput && (
          <input
            type={data.inputType}
            value={data.inputValue}
            onChange={(e) => {
              data.onChange(e.target.value);
            }}
            onBlur={(e) => {
              data.onChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                data.reactFlowInstance.fitView({
                  // minZoom: 0.0,
                  duration: 1000,
                });
              }
            }}
            placeholder={data.inputLabel}
            className="w-full p-1 text-sm border rounded"
          />
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <Separator
          style={{
            position: "absolute",
            left: "-0.01rem",
            right: "-0.01rem",
            bottom: "36px",
            width: "auto",
            height: "1px",
          }}
        />
        <div style={{ marginLeft: "-10px", marginBottom: "-12px" }}>
          by&nbsp;
          <a
            target="_blank"
            href={`https://github.com/${data.author}`}
            className="underline"
          >
            {data.author}
          </a>
        </div>
      </CardFooter>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#555",
          width: "1rem",
          height: "1rem",
          borderRadius: "6px",
        }}
      />
    </Card>
  );
};

export default function Dashboard() {
  const [storageArea, setStorageArea] = useState({ x: 0, y: 0, z: 0 });
  const [chestIndex, setChestIndex] = useState({});
  const [deliveryItems, setDeliveryItems] = useState([]);
  const [destination, setDestination] = useState({ x: 0, y: 0, z: 0 });
  const [botStatus, setBotStatus] = useState("Idle");
  const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));
  const { toast } = useToast();
  const [iframeError, setIframeError] = useState(false);
  const { theme, setTheme } = useTheme();
  const [runningNodeId, setRunningNodeId] = useState(null);
  const [chatMessages, setChatMessages] = useState<
    { timestamp: string; sender: string; message: string }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const [botState, setBotState] = useState({
    created: false,
    spawned: false,
    username: "",
    data: {},
    versions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nodeTypes, setNodeTypes] = useState<NodeType[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNodeTypes = async () => {
      try {
        const response = await axios.get<NodeType[]>(
          "http://localhost:3001/functions"
        );
        setNodeTypes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching node types:", error);
        setIsLoading(false);
      }
    };

    fetchNodeTypes();
  }, []);

  const handleIframeError = () => {
    setIframeError(true);
  };

  useEffect(() => {
    // Fetch initial chat messages
    fetch("http://localhost:3001/chat-messages")
      .then((response) => response.json())
      .then((data) => setChatMessages(data))
      .catch((error) => console.error("Error fetching chat messages:", error));

    // Set up WebSocket connection
    socketRef.current = io("http://localhost:3001");
    socketRef.current.on("chatMessage", (message: any) => {
      setChatMessages((prevMessages) =>
        [message, ...prevMessages].slice(0, 100)
      );
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() === "") {
      toast({
        title: "Message not sent",
        variant: "destructive",
        description: `Your chat message was empty. Please enter a message to send.`,
      });
      return;
    }

    fetch("http://localhost:3001/send-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast({
            title: "Message sent",
            description: `Your chat message "${inputMessage}" has been sent.`,
          });
          setInputMessage("");
        } else {
          throw new Error(data.error || "Failed to send message");
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          variant: "destructive",
          description: `Failed to send message: ${error.message}`,
        });
      });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatChatMessages = () => {
    if (chatMessages.length === 0) {
      return "No chat messages to show.\n\nHow about you gives us a star on GitHub?\ngithub.com/SilkePilon/OpenDeliveryBot";
    }
    return chatMessages
      .map((msg) => {
        const time = formatTime(msg.timestamp);
        const sender = msg.sender === "Unknown" ? "" : `${msg.sender}: `;
        if (sender === botState.username + ": ") {
          return `[YOU] [${time}] <b>${sender}</b>${msg.message}`;
        }
        if (msg.message.includes(botState.username)) {
          return `[YOU] [${time}] ${sender}${msg.message}`;
        }
        return `[${time}] ${sender}${msg.message}`;
      })
      .join("\n");
  };

  useEffect(() => {
    fetchChestIndex();
  }, []);

  const fetchChestIndex = async () => {
    try {
      const response = await axios.get("http://localhost:3001/chest-index");
      setChestIndex(response.data);
    } catch (error) {
      console.error("Error fetching chest index:", error);
    }
  };

  const handleSetStorageArea = async () => {
    try {
      await axios.post("http://localhost:3001/set-storage-area", storageArea);
      alert("Storage area set successfully");
    } catch (error) {
      console.error("Error setting storage area:", error);
      alert("Failed to set storage area");
    }
  };

  const handleDeliver = async () => {
    try {
      setBotStatus("Delivering");
      await axios.post("http://localhost:3001/deliver", {
        items: deliveryItems,
        destination: destination,
      });
      toast({
        // variant: "destructive",
        title: "Delivery completed successfully",
        description: "The bot has successfully delivered the items.",
      });
      setBotStatus("Delivery completed");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Delivery failed",
        description: error.response?.data?.error || error.message,
      });
      setBotStatus("Delivery failed");
      // alert("Delivery failed: " + error.response?.data?.error || error.message);
    }
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    const checkBotState = async () => {
      try {
        const response = await fetch("http://localhost:3001/bot-state");
        if (!response.ok) {
          throw new Error("Failed to fetch bot state");
        }
        const data = await response.json();
        setBotState(data);
        if (!data.created && !data.spawned) {
          setIframeError(true);
          console.log(data);
        } else {
          setIframeError(false);
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
        setIframeError(true);
      }
    };

    // Check immediately when the component mounts
    checkBotState();

    // Then check every 5 seconds
    const interval = setInterval(checkBotState, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // if (loading) {
  //   return <p>Loading bot state...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  // if (!botState.created) {
  //   return <p>No bot has been created yet. Use the form to create a bot.</p>;
  // }

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [height, setHeight] = useState(100);
  const resizeRef = useRef(null);

  const handleResize = useCallback(
    (e: any) => {
      e.preventDefault();
      const startY = e.clientY;
      const startHeight = height;

      const doDrag = (e: any) => {
        setHeight(Math.max(50, startHeight + e.clientY - startY));
      };

      const stopDrag = () => {
        document.removeEventListener("mousemove", doDrag);
        document.removeEventListener("mouseup", stopDrag);
      };

      document.addEventListener("mousemove", doDrag);
      document.addEventListener("mouseup", stopDrag);
    },
    [height]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  // const [selectedNode, setSelectedNode] = useState(null) as any;
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [yLever, setYLever] = useState(0);
  const [yLevelIncrement, setYLevelIncrement] = useState(0);
  const [isInFocus, setIsInFocus] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    setNodes((nds) =>
      nds.map((node) => ({
        // @ts-ignore
        ...node,
        // @ts-ignore
        data: { ...node.data, runningNodeId: runningNodeId },
      }))
    );
  }, [runningNodeId]);

  const reactFlowInstance = useReactFlow();

  const onConnect = useCallback(
    (params: any) => {
      setEdges((eds: any[]) => addEdge(params, eds));
    },
    [setEdges]
  );

  const addNode = () => {
    setYLever(yLever + yLevelIncrement);
    if (selectedNode) {
      const newNodeId = `node-${nodes.length + 1}`;
      const newNode = {
        id: newNodeId,
        type: "custom",
        position: { x: nodes.length * 400, y: yLever },
        data: {
          label: selectedNode.label,
          hasInput: selectedNode.hasInput,
          description: selectedNode.description,
          inputLabel: selectedNode.inputLabel,
          inputType: selectedNode.inputType,
          author: selectedNode.author,
          position: { x: nodes.length * 400, y: yLever },
          reactFlowInstance: reactFlowInstance,
          theme: theme,
          inputValue: "",
          onChange: (value: any) => {
            setNodes((nds: any) =>
              nds.map((node: any) =>
                node.id === newNodeId
                  ? { ...node, data: { ...node.data, inputValue: value } }
                  : node
              )
            );
          },
          onDelete: deleteNode,
          runningNodeId: runningNodeId,
        },
      };
      // @ts-ignore
      setNodes([...nodes, newNode]);

      // Connect to previous node if it exists
      if (nodes.length > 0) {
        const previousNodeId = `node-${nodes.length}`;
        setEdges((eds) => [
          ...eds,
          {
            id: `edge-${nodes.length}`,
            source: previousNodeId,
            target: newNodeId,
            type: "custom-edge",
            animated: true,
          },
        ]);
      }

      setTimeout(() => {
        reactFlowInstance.fitView({ padding: 0.2, duration: 800 });
      }, 0);

      toast({
        title: "New Node Added",
        description: `A new node of type "${selectedNode.label}" has been added. Click on the node to focus it.`,
      });
      setIsInFocus(true);
    } else {
      toast({
        title: "Node type not selected",
        variant: "destructive",
        description: "Please select a node type before adding a node.",
      });
    }
  };

  const deleteNode = useCallback(
    (nodeId: any) => {
      setNodes((nds) => nds.filter((node: any) => node.id !== nodeId));
      setEdges((eds: any) => {
        const incomingEdge = eds.find((edge: any) => edge.target === nodeId);
        const outgoingEdge = eds.find((edge: any) => edge.source === nodeId);

        if (incomingEdge && outgoingEdge) {
          // Connect the nodes on both sides of the deleted node
          toast({
            title: "Node deleted",
            variant: "destructive",
            description: `The node with ID ${nodeId} has been deleted.`,
          });
          return [
            ...eds.filter(
              (edge: any) => edge.source !== nodeId && edge.target !== nodeId
            ),
            {
              id: `edge-${incomingEdge.source}-${outgoingEdge.target}`,
              source: incomingEdge.source,
              target: outgoingEdge.target,
            },
          ];
        } else {
          // If it's an end node, just remove connected edges
          toast({
            title: "Node deleted",
            variant: "destructive",
            description: `The node with ID ${nodeId} has been deleted.`,
          });
          return eds.filter(
            (edge: any) => edge.source !== nodeId && edge.target !== nodeId
          );
        }
      });

      // Reposition remaining nodes
      setNodes((nds: any) => {
        const sortedNodes = nds.sort(
          (a: any, b: any) => a.position.x - b.position.x
        );
        return sortedNodes.map((node: any, index: any) => ({
          ...node,
          position: { x: index * 400, y: 0 },
        }));
      });

      setTimeout(() => {
        reactFlowInstance.fitView({ padding: 0.2, duration: 800 });
      }, 0);
    },
    [setNodes, setEdges, reactFlowInstance]
  );

  const runFlow = async () => {
    setIsRunning(true);
    const sortedNodes = nodes.sort(
      (a: any, b: any) => a.position.x - b.position.x
    ) as any[];

    if (sortedNodes.length === 0) {
      toast({
        title: "No nodes to run",
        variant: "destructive",
        description: "Please add some nodes before running the flow.",
      });
      return;
    }

    for (let node of sortedNodes) {
      setRunningNodeId(node.id);
      console.log(
        `Executing ${node.data.label} with input ${node.data.inputValue}`
      );
      toast({
        title: "Executing node",
        description: `Executing ${node.data.label} with input ${node.data.inputValue}`,
      });

      try {
        // Convert the node label to a flow name (lowercase with underscores)
        // const that find node.data.label in nodeTypes.
        const flowNameFinder = nodeTypes.find(
          (nt) => nt.label === node.data.label
        );
        const flowName = flowNameFinder ? flowNameFinder.id : "";
        console.log(flowName);
        // const flowName = node.data.label.toLowerCase().replace(/ /g, "_");

        // Call the API to execute the flow
        const response = await axios.post(
          `http://localhost:3001/flow/${flowName}`,
          {
            [node.data.inputLabel.toLowerCase()]: node.data.inputValue,
          }
        );

        if (response.status === 200) {
          toast({
            title: "Node executed successfully",
            description: `${node.data.label} completed successfully`,
          });
        } else {
          throw new Error(`Failed to execute ${node.data.label}`);
        }
      } catch (error: any) {
        console.error(`Error executing ${node.data.label}:`, error);
        toast({
          title: "Error",
          variant: "destructive",
          description: `Failed to execute ${node.data.label}: ${error.message}`,
        });
        setIsRunning(false);
        setRunningNodeId(null);
        return;
      }

      // Add a small delay between nodes to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setRunningNodeId(null);
    console.log("Flow execution completed");
    toast({
      title: "Flow execution completed",
      description: "All nodes in the flow have been executed.",
    });
    setIsRunning(false);
    openDialog();
  };
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            {/* <Triangle className="size-5 fill-foreground" /> */}
            <img
              style={{ imageRendering: "pixelated" }}
              className="size-7 fill-foreground"
              src="https://minecraft.wiki/images/Recovery_Compass_JE1_BE1.gif?c0c26"
            ></img>
          </Button>
        </div>
        <nav className="grid gap-2.5 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Playground"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  <img
                    style={{ imageRendering: "pixelated" }}
                    className="size-7 fill-foreground"
                    src="https://minecraft.wiki/images/Feather_JE3_BE2.png"
                  ></img>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Chat & Live view
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Playground"
                  onClick={() => {
                    window.location.href = "/flow";
                  }}
                >
                  <img
                    style={{ imageRendering: "pixelated", marginTop: "0.1rem" }}
                    className="size-7 fill-foreground"
                    src="https://minecraft.wiki/images/Sticky_Piston_%28U%29_JE3.png"
                  ></img>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Flow
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Playground"
                  onClick={() => {
                    window.location.href = "/deliver";
                  }}
                >
                  <img
                    style={{ imageRendering: "pixelated" }}
                    className="size-7 fill-foreground"
                    src="https://minecraft.wiki/images/Invicon_Carrot_on_a_Stick.png?1b7af"
                  ></img>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Deliver Items
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Models"
                  onClick={() => {
                    window.location.href = "/map";
                  }}
                >
                  <img
                    style={{ imageRendering: "pixelated" }}
                    className="size-7 fill-foreground"
                    src="https://minecraft.wiki/images/Invicon_Map.png?24187"
                  ></img>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Map & Stats
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg"
                  aria-label="API"
                >
                  <img
                    style={{ imageRendering: "pixelated" }}
                    className="size-7 fill-foreground"
                    src="https://minecraft.wiki/images/Invicon_Book_and_Quill.png?a13b5"
                  ></img>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Admin portal
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Documentation"
                >
                  <img
                    style={{ imageRendering: "pixelated" }}
                    className="size-7 fill-foreground"
                    src="https://minecraft.wiki/images/Invicon_Book.png?243d1"
                  ></img>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Documentation
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Settings"
                >
                  <img
                    style={{ imageRendering: "pixelated" }}
                    className="size-7 fill-foreground"
                    src="https://minecraft.wiki/images/Invicon_Redstone.png?26ec3"
                  ></img>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <ModeToggle></ModeToggle>
          <div style={{ width: "30%" }}></div>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Flow</h1>

          {botState.created ? (
            <StopBotDialog></StopBotDialog>
          ) : (
            // <p>Bot has been created.</p>
            <>
              <CreateBotDialog></CreateBotDialog>
            </>
          )}
          {/* {botState.spawned ? (
            <p>Bot has spawned and is ready.</p>
          ) : (
            <p>Bot is created but hasn&apos;t spawned yet.</p>
          )} */}
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Nodes
                </legend>
                <div
                  className="grid gap-3"
                  style={{ position: "relative", overflow: "visible" }}
                >
                  <Label htmlFor="role">How it works</Label>
                  <p className="text-sm text-muted-foreground">
                    <strong>1. Create Your Flow:</strong> Select and arrange
                    nodes to define the actions you want the bot to perform.
                    Each node represents a different action or decision point.
                    <br></br>
                    <strong>2. Customize Your Commands:</strong> Connect nodes
                    to create complex sequences or simple tasks, tailored to
                    your needs.<br></br>
                    <strong>3. Run Your Flow:</strong> Once you&apos;re
                    satisfied with your setup, just press the &quot;Run
                    Flow&quot; button to see your bot bring your design to life!
                    <br></br>
                    <br></br>
                    <strong>NOTE!</strong> <br></br>Placing a node behind its
                    predecessor while still being connected to it will result in
                    an error.
                    <br></br>
                    <br></br>
                    <strong>Create your own nodes</strong> <br></br>Missing a
                    node? You can create your own by contributing to the project
                    on{" "}
                    <a
                      className="underline"
                      href={
                        "https://github.com/SilkePilon/OpenDeliveryBot/tree/main"
                      }
                    >
                      GitHub
                    </a>
                    .
                  </p>
                  <Separator
                    style={{
                      position: "absolute",
                      left: "-1rem",
                      right: "-1rem",
                      bottom: "65px",
                      width: "auto",
                      height: "1px",
                    }}
                  />
                  <div style={{ height: "25px" }}></div>
                  <Select
                    onValueChange={(value) =>
                      // @ts-ignore
                      setSelectedNode(nodeTypes.find((nt) => nt.id === value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a node" />
                    </SelectTrigger>
                    <SelectContent>
                      {nodeTypes.map((nodeType) => (
                        <SelectItem key={nodeType.id} value={nodeType.id}>
                          &apos;{nodeType.label}&apos; by {nodeType.author}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Separator
                    style={{
                      position: "absolute",
                      left: "-1rem",
                      right: "-1rem",
                      bottom: "-1.5rem",
                      width: "auto",
                      height: "1px",
                    }}
                  />
                </div>
                <div style={{ width: "5px" }} />
                <div className="grid gap-3">
                  {/* <Label htmlFor="role" className="flex items-center gap-2">
                    Please enter the general coordinates for delivery
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          onClick={(event) => {
                            event.preventDefault();
                          }}
                        >
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p style={{ maxWidth: "200px" }}>
                            You can specify a general area for the bot to
                            deliver the items to. Once the bot as arrived it
                            will look for any nearby chest and deposit the items
                            there.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label> */}
                  {/* <div style={{ width: "1px" }} /> */}
                  {/* <Label htmlFor="x">Flow Controls</Label> */}
                  <div className="flex w-full items-center space-x-2">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(selectedNode);
                        addNode();
                      }}
                      disabled={!selectedNode || isRunning}
                      style={{ width: "100%" }}
                    >
                      Add Selected Node
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        runFlow();
                      }}
                      style={{ width: "100%" }}
                      disabled={
                        nodes.length === 0 ||
                        botState.created === false ||
                        isRunning
                      }
                      // variant={botState.created ? "default" : "secondary"}
                    >
                      {!botState.created
                        ? "Run Flow (Bot not connected)"
                        : isRunning
                        ? "Executing flow..."
                        : "Run Flow"}
                    </Button>
                  </div>
                </div>
              </fieldset>

              <fieldset className="grid gap-6 rounded-lg border p-4">
                <div className="grid gap-3">
                  <Label htmlFor="content">Flow Settings</Label>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="yLever">
                      Y Level Increment ({yLevelIncrement})
                    </Label>
                    <Slider
                      defaultValue={[0]}
                      max={150}
                      step={10}
                      onValueCommit={(e) => {
                        setYLevelIncrement(e[0]);
                      }}
                      onValueChange={(e) => {
                        setYLevelIncrement(e[0]);
                      }}
                    />

                    {/* <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span>
                        <a href="" style={{ textDecorationLine: "underline" }}>
                          Accept terms and conditions
                        </a>
                      </span>
                      <ExternalLink
                        style={{
                          marginTop: "-1px",
                          textDecorationLine: "underline",
                        }}
                        className="ml-1 size-5"
                      />
                    </label> */}
                  </div>
                  {/* <Textarea
                    id="content"
                    placeholder={JSON.stringify(chestIndex, null, 2)}
                    className="min-h-[9.5rem]"
                  /> */}
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <div className="flex-1">
              <div style={{ height: "87vh" }}>
                <ReactFlow
                  onClick={(e) => {
                    if (!(e.target instanceof HTMLInputElement)) {
                      reactFlowInstance.fitView({
                        // minZoom: 0.0,
                        duration: 1000,
                      });
                    }
                  }}
                  nodes={nodes}
                  edges={edges}
                  colorMode={theme === "dark" ? "dark" : "light"}
                  onNodesChange={onNodesChange}
                  // onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  nodeTypes={{ custom: CustomNode }}
                  edgeTypes={edgeTypes}
                  fitView
                  style={{
                    background: "rgba(52, 52, 52, 0.2)",
                    borderRadius: "0.9rem",
                  }}
                  zoomOnScroll={true}
                  zoomOnPinch={true}
                  zoomOnDoubleClick={true}
                  maxZoom={2.5}
                >
                  {/* <Controls>
                    <ControlButton
                      onClick={() =>
                        reactFlowInstance.fitView({
                          padding: 0.2,
                          duration: 800,
                        })
                      }
                    >
                      <X></X>
                    </ControlButton>
                  </Controls> */}
                  <DownloadButton />
                  {/* <Background /> */}
                </ReactFlow>
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                  <AlertDialogTrigger hidden>Open</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        All nodes have been executed!
                      </AlertDialogTitle>
                      <AlertDialogDescription className="bold">
                        <strong>
                          {nodes.length} node(s) have been executed
                          successfully.
                        </strong>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction onClick={closeDialog}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
