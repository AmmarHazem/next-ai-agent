"use client";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react";

interface NavigationProviderContextModel {
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: Dispatch<SetStateAction<boolean>>;
  closeMobileNav: () => void;
}

const NavigationContext = createContext<NavigationProviderContextModel>({
  closeMobileNav() {},
  isMobileNavOpen: false,
  setIsMobileNavOpen() {},
});

const NavigationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <NavigationContext.Provider
      value={{
        isMobileNavOpen,
        setIsMobileNavOpen,
        closeMobileNav() {},
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export function useNavigationProvider() {
  return useContext(NavigationContext);
}

export default NavigationProvider;
