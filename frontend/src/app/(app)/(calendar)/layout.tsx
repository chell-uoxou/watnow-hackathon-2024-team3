"use client";

import { PropsWithChildren, useState } from "react";
import { SheetHandleButton } from "~/features/appLayout/components/SheetHandleButton";
import MapDrawer from "~/features/googleMap/MapDrawer";

export default function Layout({ children }: PropsWithChildren) {
  const [showRightPanel, setShowRightPanel] = useState(false);

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
      <div className="flex flex-row h-full items-center">
        {showRightPanel && (
          <SheetHandleButton
            direction={true} // 右矢印を表示
            onClick={() => setShowRightPanel(false)}
          />
        )}
        {/* 以下がシートの内容 */}
        <div className="h-full bg-gray-200">
          {/* マップの表示 */}
          <MapDrawer show={showRightPanel} />
        </div>
      </div>
    </div>
  );
}
