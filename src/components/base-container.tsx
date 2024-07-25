import { Coffee, Gauge, Rows3, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/BasicAuth";

interface BaseContainerProps {
  children: React.ReactNode;
  route: "shotTable" | "dashboard" | "shotForm" | "error";
  error?: Error;
}

export function BaseContainer({ children, route }: BaseContainerProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex z-10 min-h-screen w-full flex-col">
      <aside className="fixed z-10 inset-y-0 left-0 w-14 flex-col border-r flex">
        <div className="border-b p-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Home"
            className={`rounded-lg ${route === "shotForm" ? "bg-muted" : ""}`}
          >
            <Coffee onClick={() => navigate("/")} />
          </Button>
        </div>
        <nav className="flex flex-col px-2 gap-4 py-2">
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg ${route === "dashboard" ? "bg-muted" : ""} my-2`}
                  aria-label="Dashboard"
                  onClick={() => navigate("/dashboard")}
                >
                  <Gauge className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Dashboard
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg ${route === "shotTable" ? "bg-muted" : ""}`}
                  aria-label="Data"
                  onClick={() => navigate("/data")}
                >
                  <Rows3 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Data
              </TooltipContent>
            </Tooltip>
          </div>
        </nav>
        <nav className="mt-auto flex flex-col gap-4 px-2 py-5">
          <ModeToggle />
        </nav>
      </aside>
      <div className="flex flex-col pl-14 z-0">
        <header className="sticky z-10 top-0 flex h-[57px] items-center border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Coffee Tracker</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
            onClick={logout}
          >
            <LogOut className="size-3.5" />
            Logout
          </Button>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
