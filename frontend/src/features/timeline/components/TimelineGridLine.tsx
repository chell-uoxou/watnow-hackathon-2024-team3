interface TimelineGridProps {
  itemHeight: number;
  hour: number;
  minutes: number;
}

export const TimelineGridLine = (props: TimelineGridProps) => {
  // グリットのdivの高さの設定
  const height = `${props.itemHeight}px`;

  return (
    <div className="flex gap-2 w-full justify-between items-start">
      {/* 時間の設定 */}
      <span className="text-xs w-9 text-black -translate-y-2">
        {/* 数字が１桁の際１０の位に０を追加 */}
        {props.hour.toString().padStart(2, "0")}:
        {props.minutes.toString().padStart(2, "0")}
      </span>
      {/* グリットの生成 */}
      <div
        className={
          "flex-1 flex w-full border-t border-brand-border-color border-dashed"
        }
        style={{ height }}
      />
    </div>
  );
};
