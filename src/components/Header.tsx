import { FC } from "react";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useNavigationProvider } from "@/context/NavigationProvider";
import { DrawerTrigger } from "./ui/drawer";

const Header: FC = () => {
  const { setIsMobileNavOpen } = useNavigationProvider();

  return (
    <header className="border-b px-2 py-2 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <DrawerTrigger onClick={() => setIsMobileNavOpen((value) => !value)}>
          <Menu />
        </DrawerTrigger>
        <p className="font-semibold">Chat with Ai Agent</p>
      </div>
      <div className="h-full flex flex-col justify-center">
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
