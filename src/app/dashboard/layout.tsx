"use client";

import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Drawer } from "@/components/ui/drawer";
import NavigationProvider from "@/context/NavigationProvider";
import { SignedIn } from "@clerk/nextjs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <Drawer direction="left">
        <div className="flex h-screen">
          <SignedIn>
            <SideBar />
          </SignedIn>
          <div className="flex-1">
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </Drawer>
    </NavigationProvider>
  );
}
