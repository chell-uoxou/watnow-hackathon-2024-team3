interface TimelineGridProps {
  itemHeight: number;
  hour: number;
  minutes: number;
}

export const TimelineGridLine = (props: TimelineGridProps) => {
  // テイルウィンドウに用いいる他目のitemHeight　pxの生成
  const height = `${props.itemHeight}px`;

  return (
    <div className="flex gap-2 w-full justify-between items-start">
      {/* 時間の設定 */}
      <span className=" text-xs w-9 text-black">
        {/* 数字が１桁の際１０の位に０を追加 */}
        {props.hour.toString().length === 1 ? "0" + props.hour : props.hour}:
        {props.minutes === 0 ? "00" : props.minutes}
      </span>
      {/* グリットの生成 */}
      <div
        className={
          "flex-1 flex w-full translate-y-2 border-t-2 border-brand-border-color border-dashed"
        }
        style={{ height }}
      />
    </div>
  );
};
