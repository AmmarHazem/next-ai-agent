"use client";

import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Drawer } from "@/components/ui/drawer";
import NavigationProvider, { useNavigationProvider } from "@/context/NavigationProvider";
import { SignedIn } from "@clerk/nextjs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isMobileNavOpen, closeMobileNav } = useNavigationProvider();
  console.log("isMobileNavOpen", isMobileNavOpen);

  return (
    <NavigationProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </NavigationProvider>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isMobileNavOpen, closeMobileNav } = useNavigationProvider();

  return (
    <Drawer direction="left" open={isMobileNavOpen} onClose={closeMobileNav}>
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
  );
}
