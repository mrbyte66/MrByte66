"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";

function TransitionInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <TransitionInner>{children}</TransitionInner>
    </Suspense>
  );
}
