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
  Unplug,
  ExternalLink,
  Plus,
  Minus,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { ModeToggle } from "@/components/modeswitch";

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
import { ImgProps } from "next/dist/shared/lib/get-img-props";

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
        <p style={{ marginLeft: "20px" }}>{row.getValue("name") as string}</p>
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
      <div className="center" style={{ textAlign: "left" }}>
        {row.getValue("description")}
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

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Playground"
                >
                  <SquareTerminal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Playdwaground
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Models"
                >
                  <Bot className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Models
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="API"
                >
                  <Code2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                API
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Documentation"
                >
                  <Book className="size-5" />
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
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Settings"
                >
                  <Settings2 className="size-5" />
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Help"
                >
                  <LifeBuoy className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Account"
                >
                  <SquareUser className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Buy And Deliver Items</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the bot and items.
                </DrawerDescription>
              </DrawerHeader>
              <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="model">Bot Type</Label>
                    <Select>
                      <SelectTrigger
                        id="model"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select a bot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="genesis">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Rabbit className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Genesis
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Our fastest model for general use cases.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="explorer">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Bird className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
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
                            <Turtle className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Quantum
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                The most powerful model for complex
                                computations.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="number" placeholder="0.4" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Top P</Label>
                    <Input id="top-p" type="number" placeholder="0.7" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Top K</Label>
                    <Input id="top-k" type="number" placeholder="0.0" />
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="You are a..." />
                  </div>
                </fieldset>
              </form>
            </DrawerContent>
          </Drawer>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Unplug className="size-4" />
            Connect
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Bot Type</Label>
                  <Select>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select a bot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genesis">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          {/* <Rabbit className="size-5" /> */}
                          <img
                            className="size-7"
                            src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b3/Compass_JE3_BE3.gif"
                          ></img>
                          <div className="grid gap-0.5">
                            <p>
                              Basic{" "}
                              <span className="font-medium text-foreground">
                                Steve
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Basic bot for general terrain and water delivery.
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
                          <div className="grid gap-0.5">
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
                          <div className="grid gap-0.5">
                            <p>
                              Advanced{" "}
                              <span className="font-medium text-foreground">
                                Beta
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              The most powerful bot for complex situations.
                              {"\n"}
                              Has the ability to use elytra fly.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="x">X coordinate</Label>
                  <Input
                    id="x"
                    type="number"
                    placeholder="45"
                    value={destination.x}
                    onChange={(e) =>
                      setDestination({
                        ...destination,
                        x: parseInt(e.target.value),
                      })
                    }
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
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Buy Items
                </legend>
                <div className="grid gap-3">
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
                          <div className="grid gap-0.5">
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
                          <div className="grid gap-0.5">
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
                          <div className="grid gap-0.5">
                            <p>
                              $$${" "}
                              <span className="font-medium text-foreground">
                                Shulkers
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Shulkers contain many different kits and tools.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  {/* <Label htmlFor="content">Available</Label> */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>See Available</Button>
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
                          Some items may appear multiple times in the list. This
                          is because they are stored in different locations or
                          have different properties (NBT).
                          <div className="">
                            <div className="flex items-center py-4">
                              <Input
                                placeholder="Filter items..."
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
                                  <Button variant="outline" className="ml-auto">
                                    Columns{" "}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                      return (
                                        <DropdownMenuCheckboxItem
                                          key={column.id}
                                          className="capitalize"
                                          checked={column.getIsVisible()}
                                          onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
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
                                        {headerGroup.headers.map((header) => {
                                          return (
                                            <TableHead key={header.id}>
                                              {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef
                                                      .header,
                                                    header.getContext()
                                                  )}
                                            </TableHead>
                                          );
                                        })}
                                      </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                  {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                      <TableRow
                                        key={row.id}
                                        data-state={
                                          row.getIsSelected() && "selected"
                                        }
                                      >
                                        {row.getVisibleCells().map((cell) => (
                                          <TableCell key={cell.id}>
                                            {flexRender(
                                              cell.column.columnDef.cell,
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
                                of {table.getFilteredRowModel().rows.length}{" "}
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
                        <AlertDialogAction>These Items!</AlertDialogAction>
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
                sw
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
              Bot Status: {botStatus}
            </Badge>
            <div className="flex-1">
              <iframe
                height={"95%"}
                width={"100%"}
                style={{ borderRadius: "1rem" }}
                src="http://localhost:3007/"
              ></iframe>
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
                  Pay and Deliver
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
