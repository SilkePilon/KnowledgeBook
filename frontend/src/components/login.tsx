"use client";
import * as React from "react";
import io from "socket.io-client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { bouncy } from "ldrs";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useToast } from "@/components/ui/use-toast";
import { Unplug, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const socket = io("http://localhost:3001");

export function CreateBotDialog() {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    username: "",
    server: "",
    port: 25565,
    version: "",
  });
  const [msaCode, setMsaCode] = React.useState("");
  const [botSpawned, setBotSpawned] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [versions, setVersions] = React.useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  //   bouncy.register();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/bot-state", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.versions);
        setVersions(data.versions || []);
      } catch (error) {
        console.error("Error fetching versions:", error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    socket.on("msaCode", (code) => {
      setMsaCode(code);
      setIsButtonDisabled(true); // Disable the button when MSA code is shown
    });

    socket.on("botSpawned", () => {
      localStorage.setItem("openSidebarOnLoad", "true");
      setBotSpawned(true);
      setIsOpen(false);
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        iframe.src = iframe.src;
      });

      if (msaCode === "") {
        toast({
          title: "Bot Spawned Successfully",
          description: "Logged in with existing MSA code",
        });
      }
      if (msaCode !== "") {
        toast({
          title: "Bot Spawned Successfully",
          description: "Logged in with new MSA code",
        });
      }
    });

    return () => {
      socket.off("msaCode");
      socket.off("botSpawned");
    };
  }, [msaCode, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVersionChange = (value: string) => {
    setFormData({ ...formData, version: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/create-bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error creating bot:", error);
    }
  };

  return (
    <>
      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => !botSpawned && setIsOpen(open)}
      >
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
            onClick={() => setIsOpen(true)}
          >
            <Unplug className="size-4" />
            Connect
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a Minecraft Bot</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the details to create and connect a Minecraft bot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right">
                  Username
                </label>
                <input
                  style={{ borderRadius: "0.375rem", paddingLeft: "0.50rem" }}
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="server" className="text-right">
                  Server
                </label>
                <input
                  style={{ borderRadius: "0.375rem", paddingLeft: "0.50rem" }}
                  id="server"
                  name="server"
                  value={formData.server}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="port" className="text-right">
                  Port
                </label>
                <input
                  style={{ borderRadius: "0.375rem", paddingLeft: "0.50rem" }}
                  id="port"
                  name="port"
                  type="number"
                  value={formData.port}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="version" className="text-right">
                  Version
                </label>
                <div className="col-span-3">
                  <Select onValueChange={handleVersionChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {versions.length > 0 ? (
                          versions
                            .slice()
                            .reverse()
                            .map((version) => (
                              <SelectItem key={version} value={version}>
                                {version}
                              </SelectItem>
                            ))
                        ) : (
                          <SelectItem value="placeholder" disabled>
                            No versions available
                          </SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {msaCode && (
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-2">MSA</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    It appears to be your first time signing in to this account.
                    To sign in, use a web browser to open the page{" "}
                    <a
                      href="https://www.microsoft.com/link"
                      target="_blank"
                      className="underline"
                    >
                      https://www.microsoft.com/link
                    </a>{" "}
                    and use the code below.
                  </p>
                  <div className="my-4" />
                  <div className="flex justify-center w-full">
                    <InputOTP
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      maxLength={8}
                      value={msaCode}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div className="my-4" />
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText(msaCode);
                      toast({
                        title: "Code Copied",
                        description: "MSA code copied to clipboard",
                      });
                    }}
                    className="text-sm text-muted-foreground flex items-center gap-1 cursor-pointer"
                  >
                    <Copy />
                    Copy code to clipboard
                  </a>
                </div>
              )}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {msaCode ? (
                <Button type="button" disabled={isButtonDisabled}>
                  Waiting for MSA...
                </Button>
              ) : (
                <Button type="submit" disabled={isButtonDisabled}>
                  Create Bot
                </Button>
              )}
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function StopBotDialog() {
  const { toast } = useToast();
  const handleDisconnect = async () => {
    try {
      const response = await fetch("http://localhost:3001/stop-bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log success message or handle UI update
        toast({
          title: "Bot Stopped Successfully",
          // description: "The bot has been stopped successfully",
        });
      } else {
        const errorData = await response.json();
        console.error(errorData.error); // Log error message or handle UI update
        toast({
          variant: "destructive",
          title: "Error Stopping Bot",
          description:
            "An error occurred while stopping the bot: " + errorData.error,
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error stopping the bot:", error); // Handle network or other errors
      window.location.reload();
    }
  };
  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="ml-auto gap-1.5 text-sm"
        onClick={handleDisconnect}
      >
        <Unplug className="size-4" />
        Disconnect
      </Button>
    </>
  );
}
