import { ReactNode } from "react";
import { ToastProvider } from "../ui/ToastProvider";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      {children}
      <ToastProvider />
    </>
  );
};
