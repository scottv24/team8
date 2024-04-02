import type { ReactElement, ReactNode } from "react";
import Navbar from "../app/Navbar";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div
      className={`flex w-screen overflow-hidden h-max sm:h-screen pt-20 bg-bg`}
    >
      <Navbar active="Products"></Navbar>
      <div
        className="mt-1/6 flex 
      flex-col items-center justify-start p-24 overflow-hidden w-screen"
      >
        {children}
      </div>
    </div>
  );
}
