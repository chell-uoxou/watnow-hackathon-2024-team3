"use client";

import { PropsWithChildren, useState } from "react";
import { SheetHandleButton } from "~/features/appLayout/components/SheetHandleButton";
import MapDrawer from "~/features/googleMap/MapDrawer";

export default function Layout({ children }: PropsWithChildren) {
  const [showRightPanel, setShowRightPanel] = useState(false);

  return (
    <div className="flex gap-0 w-full h-full">
      <div className="flex-1">{children}</div>

      {!showRightPanel && (
        <div className="flex flex-row items-center">
          <SheetHandleButton
            direction="left"
            onClick={() => setShowRightPanel(true)}
          />
        </div>
      )}

      <div className="flex flex-row h-full items-center">
        {showRightPanel && (
          <SheetHandleButton
            direction="right"
            onClick={() => setShowRightPanel(false)}
          />
        )}
        <div className="h-full bg-gray-200">
          <MapDrawer show={showRightPanel} />
        </div>
      </div>
    </div>
  );
}
