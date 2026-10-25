import { Globe, LayoutDashboard, PenTool, RefreshCcw, Sparkles, type LucideIcon } from "lucide-react";
import type { ServiceId } from "@/types/content";

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  websites: Globe,
  "web-apps": LayoutDashboard,
  "ui-ux": PenTool,
  revamp: RefreshCcw,
  ai: Sparkles,
};
