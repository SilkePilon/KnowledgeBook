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
import io, { Socket } from "socket.io-client";

export default function Dashboard() {
  const [storageArea, setStorageArea] = useState({ x: 0, y: 0, z: 0 });
  const [chestIndex, setChestIndex] = useState({});
  const [deliveryItems, setDeliveryItems] = useState([]);
  const [destination, setDestination] = useState({ x: 0, y: 0, z: 0 });
  const [botStatus, setBotStatus] = useState("Idle");
  const { toast } = useToast();
  const [iframeError, setIframeError] = useState(false);
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

  const autoScaleTextarea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(
        textareaRef.current.scrollHeight,
        window.innerHeight * 0.9
      );
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, []);

  useEffect(() => {
    autoScaleTextarea();
  }, [autoScaleTextarea]);

  useEffect(() => {
    window.addEventListener("resize", autoScaleTextarea);
    return () => {
      window.removeEventListener("resize", autoScaleTextarea);
    };
  }, [autoScaleTextarea]);

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
                  className="rounded-lg bg-muted"
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
          <h1 className="text-xl font-semibold">Chat & Live view</h1>

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
                <legend className="-ml-1 px-1 text-sm font-medium">Chat</legend>
                <div
                  className="grid gap-3"
                  style={{ position: "relative", overflow: "visible" }}
                >
                  <Label htmlFor="model">
                    {botState.username || "Not Connected"}
                    {"`s Chat"}
                  </Label>
                  <Textarea
                    ref={textareaRef}
                    value={formatChatMessages()}
                    readOnly
                    className="text-sm text-muted-foreground"
                    style={{
                      width: "100%",
                      minHeight: "60vh",
                      maxHeight: "70vh",
                      overflowY: "auto",
                      // resize: "none",
                      borderRadius: "0.5rem",
                      padding: "0.5rem",
                    }}
                  />

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
                  <Label htmlFor="x">Send chat message</Label>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      id="chatMessage"
                      type="text"
                      placeholder="Message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        sendMessage();
                      }}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </fieldset>

              <fieldset className="grid gap-6 rounded-lg border p-4">
                <div className="grid gap-3">
                  <Label htmlFor="content">Settings</Label>
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
              {!iframeError ? (
                <iframe
                  height="95%"
                  loading="lazy"
                  width="100%"
                  style={{ borderRadius: "1rem" }}
                  src="http://localhost:3007/"
                  onError={handleIframeError}
                  key={"iframekey"}
                />
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
          </div>
        </main>
      </div>
    </div>
  );
}
