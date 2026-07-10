"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";
export type HudLevel = "full" | "simplified" | "minimal";

interface DeviceCtx {
  device: DeviceType;
  hud: HudLevel;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function getDevice(w: number): DeviceType {
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getHud(device: DeviceType): HudLevel {
  if (device === "desktop") return "full";
  if (device === "tablet") return "simplified";
  return "minimal";
}

const Ctx = createContext<DeviceCtx>({
  device: "desktop",
  hud: "full",
  isMobile: false,
  isTablet: false,
  isDesktop: true,
});

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    const update = () => setDevice(getDevice(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Ctx.Provider
      value={{
        device,
        hud: getHud(device),
        isMobile: device === "mobile",
        isTablet: device === "tablet",
        isDesktop: device === "desktop",
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useDevice = () => useContext(Ctx);
