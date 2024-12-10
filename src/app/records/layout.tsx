'use client'

import { StepBack } from "lucide-react";
import { useRouter } from "next/navigation";

const RecordLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="relative mx-auto max-w-2xl min-h-screen border overflow-hidden">
      <header className="p-4 px-6 border-b flex items-center gap-1">
        <StepBack
          className="w-4 h-4 cursor-pointer"
          onClick={() => router.push("/")}
        />

        <h1 className="text-[16px] font-semibold ">Submission Records</h1>
      </header>
      {children}
    </div>
  );
};

export default RecordLayout;
