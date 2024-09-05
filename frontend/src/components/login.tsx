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
import { Separator } from "@/components/ui/separator";

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
import { set } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useApiIp } from "@/lib/utils/useApiIp";

export function SetApiKeyDialog() {
  const { apiIp } = useApiIp();
  const socket = io(`${apiIp}`);
  const { toast } = useToast();
  const [apiKey, setApiKey] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const setApiKey2 = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiIp}/set-api-key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast({
        title: "API Key Set",
        description: "Your API key has been set successfully.",
      });
    } catch (error) {
      console.error("Error setting API key:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to set API key.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
            onClick={() => setIsOpen(true)}
          >
            Set API Key
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Set NVIDIA API Key</AlertDialogTitle>
            <AlertDialogDescription>
              To use some parts of this application, you need an NVIDIA API key.
              Follow the instructions below to obtain and set your API key.
              <div className="my-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Instructions to Obtain an NVIDIA API Key:</strong>
                  <br />
                  1. Visit{" "}
                  <a
                    className="underline"
                    href="https://build.nvidia.com/meta/llama-3_1-8b-instruct"
                  >
                    nvidia playground
                  </a>
                  .
                  <br />
                  2. Sign in or create an account.
                  <br />
                  3. Find the &apos;Get API Key&apos; button above the example
                  code
                  <br />
                  4. Click &apos;Generate Key&apos;
                  <br />
                  5. Copy the key and paste it into the field below.
                  <br />
                  <br />
                  <strong>Why is the API Key Useful?</strong>
                  <br />
                  The API key is required to generate custom nodes based on a
                  text input.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setApiKey2();
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="apiKey" className="text-right">
                  API Key
                </label>
                <Input
                  id="apiKey"
                  name="apiKey"
                  type="password"
                  placeholder="nvapi-"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <div className="my-4" />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Setting API Key..." : "Set API Key"}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function CreateBotDialog() {
  const { toast } = useToast();
  const { apiIp, setApiIp } = useApiIp();
  const [socket, setSocket] = React.useState<any>(null);
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiIpStatus, setApiIpStatus] = React.useState<
    "default" | "success" | "error"
  >("default");

  const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null); // Ref to store the timeout

  const testApiIp = async (ip: string) => {
    try {
      const response = await fetch(`${ip}/bot-state`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVersions(data.versions || []);
      setApiIpStatus("success");
    } catch (error) {
      console.error("Error fetching versions:", error);
      setApiIpStatus("error");
      setVersions([]);
    }
  };

  const handleApiIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiIp = e.target.value;
    setApiIp(newApiIp);
    setApiIpStatus("default");

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Clear the previous timeout
    }

    debounceTimeout.current = setTimeout(() => {
      testApiIp(newApiIp); // Call the API after the user has stopped typing
    }, 500); // Adjust this delay (500ms) based on preference
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVersionChange = (value: string) => {
    setFormData({ ...formData, version: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${apiIp}/create-bot`, {
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
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create bot",
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (apiIpStatus === "success" && !socket) {
      const newSocket = io(`${apiIp}`);
      setSocket(newSocket);

      newSocket.on("msaCode", (code: string) => {
        setMsaCode(code);
        setIsButtonDisabled(true);
      });

      newSocket.on("botSpawned", () => {
        localStorage.setItem("openSidebarOnLoad", "true");
        setBotSpawned(true);
        setIsOpen(false);
        const iframes = document.querySelectorAll("iframe");
        iframes.forEach((iframe) => {
          iframe.src = iframe.src;
        });

        toast({
          title: "Bot Spawned Successfully",
          description: msaCode
            ? "Logged in with new MSA code"
            : "Logged in with existing MSA code",
        });
      });

      return () => {
        newSocket.off("msaCode");
        newSocket.off("botSpawned");
      };
    }
  }, [apiIpStatus, apiIp, socket, msaCode, toast]);

  return (
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
          Connect a bot
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
              <label htmlFor="apiIp" className="text-right">
                API IP
              </label>
              <Input
                id="apiIp"
                name="apiIp"
                placeholder="https://localhost:3001"
                type="text"
                // value={apiIp}
                onChange={handleApiIpChange}
                className={`col-span-3 ${
                  apiIpStatus === "success"
                    ? "border-green-500"
                    : apiIpStatus === "error"
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            {apiIpStatus === "success" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right">
                    Username
                  </label>
                  <Input
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
                  <Input
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
                  <Input
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
              </>
            )}

            {msaCode && (
              <>
                <Separator />
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
              </>
            )}
          </div>
          <div className="my-4" />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {msaCode ? (
              <Button type="button" disabled={isButtonDisabled}>
                Waiting for MSA...
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={
                  isButtonDisabled || isLoading || apiIpStatus !== "success"
                }
              >
                {isLoading ? "Creating Bot..." : "Create Bot"}
              </Button>
            )}
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function StopBotDialog() {
  const { toast } = useToast();
  const { apiIp } = useApiIp();
  const handleDisconnect = async () => {
    try {
      const response = await fetch(`${apiIp}/stop-bot`, {
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
      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          size="sm"
          className="ml-auto gap-1.5 text-sm"
          onClick={handleDisconnect}
        >
          <Unplug className="size-4" />
          Disconnect
        </Button>
        <p className="text-sm text-muted-foreground">or</p>

        <SetApiKeyDialog />
      </div>
    </>
  );
}
