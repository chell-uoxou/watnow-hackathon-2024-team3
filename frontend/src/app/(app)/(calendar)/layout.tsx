"use client";

import { PropsWithChildren, useState } from "react";
import { Button } from "~/components/ui/button";
import { SheetHandleButton } from "~/features/appLayout/components/SheetHandleButton";

export default function Layout({ children }: PropsWithChildren) {
  const [showRightPanel, setShowRightPanel] = useState(true);

  return (
    <div className="flex gap-0 w-full h-full">
      <div className="flex-1">{children}</div>

      {/* パネルが非表示のときに左矢印ボタンを表示 */}
      {!showRightPanel && (
        <div className="flex flex-row items-center">
          <SheetHandleButton
            direction={false} // 左矢印を表示
            onClick={() => setShowRightPanel(true)}
          />
        </div>
      )}

      {/* パネルが表示されているときに右矢印ボタンとパネルを表示 */}
      {showRightPanel && (
        <div className="flex flex-row h-full items-center">
          <SheetHandleButton
            direction={true} // 右矢印を表示
            onClick={() => setShowRightPanel(false)}
          />
          <div className="h-full w-full bg-gray-200">
            <h1>Right Panel</h1>
            <Button onClick={() => setShowRightPanel(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
