"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <>
                    {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
                    {theme === "light" && (
                      <img
                        style={{ imageRendering: "pixelated" }}
                        className="size-7 absolute rotate-0 scale-100 transition-all"
                        src="https://minecraft.wiki/images/Invicon_Lantern.png?b6bc8"
                        alt="Light Mode"
                      />
                    )}
                    {theme === "dark" && (
                      <img
                        style={{ imageRendering: "pixelated" }}
                        className="size-7 absolute rotate-0 scale-100 transition-all"
                        src="https://minecraft.wiki/images/Invicon_Soul_Lantern.png?00f4a"
                        alt="Dark Mode"
                      />
                    )}
                  </>
                  {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="center">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Select theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
