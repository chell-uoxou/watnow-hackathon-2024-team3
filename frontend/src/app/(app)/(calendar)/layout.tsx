"use client";

import { PropsWithChildren, useState } from "react";
import { Button } from "~/components/ui/button";

export default function Layout({ children }: PropsWithChildren) {
  const [showRightPanel, setShowRightPanel] = useState(true);

  return (
    <div className="flex gap-0 w-full h-full">
      <div className="flex-1">{children}</div>
      {showRightPanel && (
        <div className="w-1/4 bg-gray-200">
          <h1>Right Panel</h1>
          <Button onClick={() => setShowRightPanel(false)}>Close</Button>
        </div>
      )}
    </div>
  );
}
