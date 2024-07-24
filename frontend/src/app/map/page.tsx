"use client";
import "./App.css";
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
  Unplug,
  ExternalLink,
  Plus,
  Minus,
  Info,
} from "lucide-react";
import { CreateBotDialog, StopBotDialog } from "@/components/login";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReactSkinview3d from "react-skinview3d";
import { SkinViewer, WalkingAnimation } from "skinview3d";
import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { ModeToggle } from "@/components/modeswitch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 64,
    name: "Gold Block",
    description: "",
  },
  {
    id: "3u1reuv4",
    amount: 64,
    name: "Diamond",
    description: "",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description:
      "Some items may appear multiple times in the list. This is because they are stored in different locations or have different properties (NBT).Some items may appear multiple times in the list. This is because they are stored in different locations or have different properties (NBT).",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Golden Apple",
    description: "",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "elytra",
    description: "Just Fly",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
  {
    id: "3u1reuv4",
    amount: 1,
    name: "Shulker Box",
    description: "PVP Kit",
  },
];

type Payment = {
  id: string;
  amount: number;
  name: string;
  description: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize flex items-center">
        <img
          alt="Item"
          className="mr-2 w-8 h-8 object-contain"
          style={{
            imageRendering: "pixelated",
            width: "42px",
            height: "42px",
            borderRadius: "0.30rem",
          }}
          src={`https://assets.mcasset.cloud/1.21/assets/minecraft/textures/item/${(
            row.getValue("name") as string
          )
            .toLowerCase()
            .replace(/ /g, "_")}.png`}
          onError={(e: any) => {
            e.target.onerror = null; // Prevents looping
            e.target.src = `https://assets.mcasset.cloud/1.21/assets/minecraft/textures/block/${(
              row.getValue("name") as string
            )
              .toLowerCase()
              .replace(/ /g, "_")}.png`;
          }}
        ></img>
        <p style={{ marginLeft: "20px" }} className="flex items-center gap-2">
          {row.getValue("name")}
          <Popover>
            <PopoverTrigger asChild>
              <div
                className="cursor-pointer"
                onClick={() => {
                  const fetchData = async () => {
                    try {
                      // First, try to fetch from items API
                      let response = await fetch(
                        "https://minecraft-api.vercel.app/api/items"
                      );
                      if (!response.ok) {
                        throw new Error("Network response was not ok");
                      }
                      let data = await response.json();

                      // Convert the name to namespacedId format
                      const namespacedId = (row.getValue("name") as string)
                        .toLowerCase()
                        .replace(/ /g, "_");

                      let item = data.find(
                        (i: any) => i.namespacedId === namespacedId
                      );

                      // If not found in items, try blocks API
                      if (!item) {
                        response = await fetch(
                          "https://minecraft-api.vercel.app/api/blocks"
                        );
                        if (!response.ok) {
                          throw new Error("Network response was not ok");
                        }
                        data = await response.json();
                        item = data.find(
                          (b: any) => b.namespacedId === namespacedId
                        );
                      }

                      if (item) {
                        const tooltipContent =
                          document.querySelector(".tooltip-content");
                        if (tooltipContent) {
                          tooltipContent.innerHTML = `
                    <p><strong>${item.name}</strong></p>
                    <p>${item.description || "No description available."}</p>
                    ${
                      item.stackSize
                        ? `<p>Stack Size: ${item.stackSize}</p>`
                        : ""
                    }
                    ${
                      item.renewable !== undefined
                        ? `<p>Renewable: ${item.renewable ? "Yes" : "No"}</p>`
                        : ""
                    }
                    ${
                      item.blastResistance
                        ? `<p>Blast Resistance: ${item.blastResistance}</p>`
                        : ""
                    }
                    <img src="${item.image}" alt="${
                            item.name
                          }" style="width: 64px; height: 64px; image-rendering: pixelated;">
                  `;
                        }
                      } else {
                        throw new Error("Item not found");
                      }
                    } catch (error) {
                      console.error("Error fetching data:", error);
                      const tooltipContent =
                        document.querySelector(".tooltip-content");
                      if (tooltipContent) {
                        tooltipContent.textContent = "Error loading item data.";
                      }
                    }
                  };

                  // Add a delay before making the fetch request
                  setTimeout(fetchData, 1300); // 1300 milliseconds delay
                }}
              >
                <Info className="h-4 w-4" />
              </div>
            </PopoverTrigger>
            <PopoverContent side="right">
              <p className="tooltip-content" style={{ maxWidth: "400px" }}>
                Loading...
              </p>
            </PopoverContent>
          </Popover>
        </p>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div
        style={{
          textAnchor: "middle",
          textAlign: "center",
        }}
      >
        {row.getValue("description") ? (
          <Popover>
            <PopoverTrigger>Open Details</PopoverTrigger>
            <PopoverContent>{row.getValue("description")}</PopoverContent>
          </Popover>
        ) : null}
      </div>
    ),
  },
  {
    accessorKey: "available",
    header: () => <div className="text-right">Available</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return <div className="text-right font-medium">{amount}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return (
        <div className="text-right font-medium flex items-center justify-end space-x-2">
          <Button variant={"outline"}>
            <Plus className="cursor-pointer" />
          </Button>
          <span>{amount}</span>
          <Button variant={"outline"}>
            <Minus className="cursor-pointer" />
          </Button>
        </div>
      );
    },
  },
];

export default function Dashboard() {
  const [storageArea, setStorageArea] = useState({ x: 0, y: 0, z: 0 });
  const [chestIndex, setChestIndex] = useState({});
  const [deliveryItems, setDeliveryItems] = useState([]);
  const [destination, setDestination] = useState({ x: 0, y: 0, z: 0 });
  const [botStatus, setBotStatus] = useState("Idle");
  const { toast } = useToast();
  const [iframeError, setIframeError] = useState(false);
  const [mapData, setMapData] = useState({});
  const [entityPositions, setEntityPositions] = useState({});
  const wsRef = useRef(null);
  const [cape, setCape] = useState("");
  const [skinViewKey, setSkinViewKey] = useState(0);
  const [botState, setBotState] = useState({
    created: false,
    spawned: false,
    username: "",
    data: {},
    versions: [],
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      // Check if the iframe content has loaded after a short delay
      try {
        const response = await axios.get("http://localhost:3001/chest-index");
      } catch (error) {
        setIframeError(true);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUUIDAndCape = async (username: string) => {
      console.log("Fetching UUID and cape for", username);
      try {
        // First, check localStorage
        const storedCape = localStorage.getItem("capeUrl");
        if (storedCape) {
          setCape(storedCape);
          setSkinViewKey((prevKey) => prevKey + 1);
        }

        const response = await fetch(
          `https://api.capes.dev/load/${username}/minecraft`
        );
        const data = await response.json();
        const capeUrl = data.imageUrl;
        console.log("Cape:", capeUrl);
        setCape(capeUrl);
        if (capeUrl) {
          localStorage.setItem("capeUrl", capeUrl);
        }
        // Increment the key to force a re-render of ReactSkinview3d
        setSkinViewKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.error("Error fetching UUID or cape:", error);
      }
    };

    if (botState.username) {
      fetchUUIDAndCape(botState.username);
    }
  }, [botState.username]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("WebSocket connected");
      setInterval(() => {
        socket.send("getMap");
      }, 1000);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMapData(data.mapData);
      setEntityPositions(data.entityPositions);
    };

    return () => {
      if (socket.readyState === 1) {
        // <-- This is important
        socket.close();
      }
    };
  }, []);

  const handleIframeError = () => {
    setIframeError(true);
  };

  useEffect(() => {
    fetchChestIndex();
  }, []);

  const mapUrl = `http://localhost:3001/map-image?${Date.now()}`;

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

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

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
      } catch (err: any) {
        setError(err.message);
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
                Deliver items
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
          <h1 className="text-xl font-semibold">Map</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
              className="max-h-[80vh]"
            >
              <ScrollArea className="">
                <DrawerHeader>
                  <DrawerTitle>Configuration</DrawerTitle>
                  <DrawerDescription>
                    Configure the settings for the bot and items.
                  </DrawerDescription>
                </DrawerHeader>
                <form
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                  className="grid gap-30"
                >
                  <center>
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Settings
                      </legend>
                      <div
                        className="grid gap-3"
                        style={{ position: "relative", overflow: "visible" }}
                      >
                        <Label htmlFor="model">Bot Type</Label>
                        <Select>
                          <SelectTrigger
                            id="model"
                            className="items-start [&_[data-description]]:hidden"
                          >
                            <SelectValue placeholder="Select a bot" />
                          </SelectTrigger>
                          <SelectContent className="w-[var(--radix-select-trigger-width)] min-w-[8rem]">
                            <SelectItem value="genesis">
                              <div className="flex items-start gap-3 text-muted-foreground">
                                {/* <Rabbit className="size-5" /> */}
                                <img
                                  className="size-7 flex-shrink-0"
                                  src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b3/Compass_JE3_BE3.gif"
                                ></img>
                                <div className="grid gap-0.5 min-w-0 flex-1">
                                  <p>
                                    Basic{" "}
                                    <span className="font-medium text-foreground">
                                      Stevedw
                                    </span>
                                  </p>
                                  <p
                                    className="text-xs break-words line-clamp-2"
                                    data-description
                                  >
                                    Basic bot for general terrain and water
                                    delivery.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="explorer">
                              <div className="flex items-start gap-3 text-muted-foreground">
                                <img
                                  className="size-6"
                                  src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/33/Recovery_Compass_JE1_BE1.gif"
                                ></img>
                                <div className="grid gap-0.5 min-w-0 flex-1">
                                  <p>
                                    Pro{" "}
                                    <span className="font-medium text-foreground">
                                      Explorer
                                    </span>
                                  </p>
                                  <p className="text-xs" data-description>
                                    Performance and speed for efficiency.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="quantum">
                              <div className="flex items-start gap-3 text-muted-foreground">
                                <img
                                  className="size-6"
                                  src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/6f/Elytra_JE2_BE2.png"
                                ></img>
                                <div className="grid gap-0.5 min-w-0 flex-1">
                                  <p>
                                    Advanced{" "}
                                    <span className="font-medium text-foreground">
                                      Beta
                                    </span>
                                  </p>
                                  <p
                                    className="text-xs break-words"
                                    data-description
                                  >
                                    The most powerful bot for complex
                                    situations.
                                    {"\n"}
                                    Has the ability to use elytra fly.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Separator
                          style={{
                            position: "absolute",
                            left: "-1rem",
                            right: "-1rem",
                            bottom: "-1.5rem",
                            width: "auto",
                          }}
                        />
                      </div>
                      <div style={{ width: "5px" }} />
                      <div className="grid gap-3">
                        <Label
                          htmlFor="role"
                          className="flex items-center gap-2"
                        >
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
                                  deliver the items to. Once the bot as arrived
                                  it will look for any nearby chest and deposit
                                  the items there.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <div style={{ width: "1px" }} />
                        <ReactSkinview3d
                          className="viewer"
                          skinUrl="textures/skin-legacyhat-default-no_hd.png"
                          height={300}
                          width={150}
                          onReady={({ viewer }) => {
                            viewer.zoom = 4.5;
                            // Add an animation
                            viewer.animation = new WalkingAnimation();
                            // Enabled auto rotate
                            viewer.autoRotate = true;
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="y">Y coordinate</Label>
                          <Input
                            id="y"
                            type="number"
                            placeholder="123"
                            value={destination.y}
                            onChange={(e) =>
                              setDestination({
                                ...destination,
                                y: parseInt(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="z">Z coordinate</Label>
                          <Input
                            id="z"
                            type="number"
                            placeholder="64"
                            value={destination.z}
                            onChange={(e) =>
                              setDestination({
                                ...destination,
                                z: parseInt(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                    </fieldset>
                    <div style={{ width: "40px" }} />
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Select Items
                      </legend>
                      <div
                        className="grid gap-3"
                        style={{ position: "relative", overflow: "visible" }}
                      >
                        <Label htmlFor="role">Item Type</Label>
                        <Select>
                          <SelectTrigger
                            id="model1"
                            className="items-start [&_[data-description]]:hidden"
                          >
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="genesis">
                              <div className="flex items-start gap-3 text-muted-foreground">
                                {/* <Rabbit className="size-5" /> */}
                                <img
                                  className="size-7"
                                  src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/2f/Dirt.png"
                                ></img>
                                <div className="grid gap-0.5 min-w-0 flex-1">
                                  <p>
                                    ${" "}
                                    <span className="font-medium text-foreground">
                                      Blocks
                                    </span>
                                  </p>
                                  <p className="text-xs" data-description>
                                    Blocks such as dirt, stone, etc.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="explorer">
                              <div className="flex items-start gap-3 text-muted-foreground">
                                <img
                                  className="size-6"
                                  src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/54/Golden_Apple_JE2_BE2.png"
                                ></img>
                                <div className="grid gap-0.5 min-w-0 flex-1">
                                  <p>
                                    $${" "}
                                    <span className="font-medium text-foreground">
                                      Items
                                    </span>
                                  </p>
                                  <p className="text-xs" data-description>
                                    Items such as golden apples, diamonds, etc.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="quantum">
                              <div className="flex items-start gap-3 text-muted-foreground">
                                <img
                                  className="w-6 h-8"
                                  src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e5/Shulker_Box.gif"
                                ></img>
                                <div className="grid gap-0.5 min-w-0 flex-1">
                                  <p>
                                    $$${" "}
                                    <span className="font-medium text-foreground">
                                      Shulkers
                                    </span>
                                  </p>
                                  <p className="text-xs" data-description>
                                    Shulkers contain many different kits and
                                    tools.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Separator
                          style={{
                            position: "absolute",
                            left: "-1rem",
                            right: "-1rem",
                            bottom: "-1.5rem",
                            width: "auto",
                          }}
                        />
                      </div>
                      <div style={{ width: "5px" }} />
                      <div className="grid gap-3">
                        {/* <Label htmlFor="content">Available</Label> */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button>Please Select Items</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent
                            style={{ minWidth: "50vw", maxWidth: "60vw" }}
                            // className="w-[8000px] sm:w-[60vw]"
                          >
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Please select the items you want to deliver.
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Some items may appear multiple times in the
                                list. This is because they are stored in
                                different locations or have different properties
                                (NBT). You can click the{" "}
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Info className="h-3 w-3" />
                                </span>{" "}
                                to see more info about that block or item.
                                Toggle the checkbox in front of an item to
                                select it for delivery.
                                <div className="">
                                  <div className="flex items-center py-4">
                                    <Input
                                      placeholder="Search for items..."
                                      value={
                                        (table
                                          .getColumn("name")
                                          ?.getFilterValue() as string) ?? ""
                                      }
                                      onChange={(event) =>
                                        table
                                          .getColumn("name")
                                          ?.setFilterValue(event.target.value)
                                      }
                                      className="max-w-sm"
                                    />
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="ml-auto"
                                        >
                                          Columns{" "}
                                          <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        {table
                                          .getAllColumns()
                                          .filter((column) =>
                                            column.getCanHide()
                                          )
                                          .map((column) => {
                                            return (
                                              <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                  column.toggleVisibility(
                                                    !!value
                                                  )
                                                }
                                              >
                                                {column.id}
                                              </DropdownMenuCheckboxItem>
                                            );
                                          })}
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  <div className="rounded-md border">
                                    <Table>
                                      <TableHeader>
                                        {table
                                          .getHeaderGroups()
                                          .map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                              {headerGroup.headers.map(
                                                (header) => {
                                                  return (
                                                    <TableHead key={header.id}>
                                                      {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column
                                                              .columnDef.header,
                                                            header.getContext()
                                                          )}
                                                    </TableHead>
                                                  );
                                                }
                                              )}
                                            </TableRow>
                                          ))}
                                      </TableHeader>
                                      <TableBody>
                                        {table.getRowModel().rows?.length ? (
                                          table
                                            .getRowModel()
                                            .rows.map((row) => (
                                              <TableRow
                                                key={row.id}
                                                data-state={
                                                  row.getIsSelected() &&
                                                  "selected"
                                                }
                                              >
                                                {row
                                                  .getVisibleCells()
                                                  .map((cell) => (
                                                    <TableCell key={cell.id}>
                                                      {flexRender(
                                                        cell.column.columnDef
                                                          .cell,
                                                        cell.getContext()
                                                      )}
                                                    </TableCell>
                                                  ))}
                                              </TableRow>
                                            ))
                                        ) : (
                                          <TableRow>
                                            <TableCell
                                              colSpan={columns.length}
                                              className="h-24 text-center"
                                            >
                                              No results.
                                            </TableCell>
                                          </TableRow>
                                        )}
                                      </TableBody>
                                    </Table>
                                  </div>
                                  <div className="flex items-center justify-end space-x-2 py-4">
                                    <div className="flex-1 text-sm text-muted-foreground">
                                      {
                                        table.getFilteredSelectedRowModel().rows
                                          .length
                                      }{" "}
                                      of{" "}
                                      {table.getFilteredRowModel().rows.length}{" "}
                                      row(s) selected.
                                    </div>
                                    <div className="space-x-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                      >
                                        Previous
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                      >
                                        Next
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>
                                These Items!
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {/* <Textarea
                      id="content"
                      placeholder={JSON.stringify(chestIndex, null, 2)}
                      className="min-h-[9.5rem]"
                    /> */}
                      </div>
                    </fieldset>
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Selected Items
                      </legend>
                      None
                    </fieldset>
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                      <div className="grid gap-3">
                        <Label htmlFor="content">Terms and conditions</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" />
                          <label
                            htmlFor="terms"
                            className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <span>
                              <a
                                href=""
                                style={{ textDecorationLine: "underline" }}
                              >
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
                          </label>
                        </div>
                        {/* <Textarea
                      id="content"
                      placeholder={JSON.stringify(chestIndex, null, 2)}
                      className="min-h-[9.5rem]"
                    /> */}
                      </div>
                    </fieldset>
                  </center>
                </form>
              </ScrollArea>
            </DrawerContent>
          </Drawer>
          {botState.created ? (
            <StopBotDialog></StopBotDialog>
          ) : (
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
                  About
                </legend>
                <div
                  className="grid gap-3"
                  style={{ position: "relative", overflow: "visible" }}
                >
                  <Label htmlFor="model">Username</Label>
                  <h1 className="text-2xl font-semibold">
                    {botState.username || "Not Connected"}
                  </h1>
                  <Separator
                    style={{
                      position: "absolute",
                      left: "-1rem",
                      right: "-1rem",
                      bottom: "-1.5rem",
                      width: "auto",
                    }}
                  />
                </div>
                <div style={{ width: "5px" }} />
                <div className="grid gap-3">
                  {botState.username === "" ||
                  botState.username === undefined ? (
                    <p className="text-sm text-muted-foreground text-center">
                      CustomCapes (placeholder)
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center">
                      {botState.username}
                    </p>
                  )}

                  <center>
                    <ReactSkinview3d
                      className="viewer"
                      skinUrl={`https://mineskin.eu/skin/${
                        botState.username || "CustomCapes"
                      }`}
                      key={skinViewKey} // This will force a re-render when it changes
                      height={300}
                      width={150}
                      onReady={({ viewer }) => {
                        // Add an animation
                        viewer.animation = new WalkingAnimation();

                        // Enable auto rotate
                        viewer.autoRotate = true;
                        if (cape) {
                          viewer.loadCape(cape);
                        }
                      }}
                    />
                  </center>
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  {botState.username || "Not Connected"}&apos;s Status
                </legend>
                <div
                  className="grid gap-3"
                  style={{ position: "relative", overflow: "visible" }}
                >
                  <Label htmlFor="role">Health</Label>
                  <img
                    style={{ imageRendering: "pixelated" }}
                    width={"200vw"}
                    src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/59/Healthbar.png"
                  ></img>
                  <Label htmlFor="role">Health</Label>
                  <img
                    style={{ imageRendering: "pixelated" }}
                    src="https://art.pixilart.com/33d72d0b74d9c81.png"
                    width={"200vw"}
                  ></img>
                  <Separator
                    style={{
                      position: "absolute",
                      left: "-1rem",
                      right: "-1rem",
                      bottom: "-1.5rem",
                      width: "auto",
                    }}
                  />
                </div>

                <div style={{ width: "5px" }} />
                <div className="grid gap-3">
                  <Label htmlFor="content">Inventory</Label>
                  <img
                    style={{ imageRendering: "pixelated" }}
                    src="https://wallpapers.com/images/hd/minecraft-inventory-fmyuojmmrku9we1g.jpg"
                    width={"200vw"}
                  ></img>

                  {/* <Textarea
                    id="content"
                    placeholder={JSON.stringify(chestIndex, null, 2)}
                    className="min-h-[9.5rem]"
                  /> */}
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Selected Items
                </legend>
                None
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <div className="grid gap-3">
                  <Label htmlFor="content">Terms and conditions</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
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
                    </label>
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
            <Badge variant="secondary" className="absolute right-6 top-6">
              Live
            </Badge>
            <div className="flex-1">
              {!iframeError ? (
                <div className="App">
                  <h1>Minecraft Map Viewer (example)</h1>
                  <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                  >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                      <>
                        <div className="tools">
                          <button onClick={() => zoomIn()}>+</button>
                          <button onClick={() => zoomOut()}>-</button>
                          <button onClick={() => resetTransform()}>
                            Reset
                          </button>
                        </div>
                        <TransformComponent>
                          <div className="map-container">
                            <img
                              src={
                                "https://cdn.modrinth.com/data/PFb7ZqK6/images/70e23cdfe0906777ecfd2a9296b146d03f91bc67.png"
                              }
                              alt="Minecraft Map"
                              className="map-image"
                              width={"100%"}
                              height={"100%"}
                            />
                            {Object.values(entityPositions).map(
                              (entity: any, index) => (
                                <div
                                  key={index}
                                  className={`entity ${entity.type}`}
                                  style={{
                                    left: `${entity.x}px`,
                                    top: `${entity.z}px`,
                                  }}
                                  title={`${entity.name} (${entity.type})`}
                                />
                              )
                            )}
                          </div>
                        </TransformComponent>
                      </>
                    )}
                  </TransformWrapper>
                </div>
              ) : (
                <div
                  style={{
                    height: "80%",
                    width: "100%",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "#f0f0f0", // or any color that fits your design
                  }}
                >
                  <Unplug size={48} /> {/* Adjust size as needed */}
                  <p style={{ marginTop: "1rem" }}>Bot not active</p>
                </div>
              )}
            </div>
            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Add notes to your delivery..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div
                style={{ overflowX: "hidden" }}
                className="flex items-center p-3 pt-0"
              >
                {/* <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      dw
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}

                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    handleDeliver();
                  }}
                  type="submit"
                  size="sm"
                  className="ml-auto gap-1.5"
                >
                  Start Delivery
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
