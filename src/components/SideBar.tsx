"use client";
import { useNavigationProvider } from "@/context/NavigationProvider";
import { FC } from "react";
import { DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "./ui/drawer";

const SideBar: FC = () => {
  const { closeMobileNav, isMobileNavOpen } = useNavigationProvider();

  return (
    <>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </>
  );
};

export default SideBar;
