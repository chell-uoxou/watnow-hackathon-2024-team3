import { Skeleton } from "~/components/ui/skeleton";

const Item = () => {
  return <Skeleton className="h-[140px] w-[350px]" />;
};

const EventPoolListSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 overflow-hidden">
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default EventPoolListSkeleton;
