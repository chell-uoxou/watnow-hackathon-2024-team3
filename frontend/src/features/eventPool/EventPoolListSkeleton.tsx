import { Skeleton } from "~/components/ui/skeleton";

const EventPoolListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-[140px] w-[350px]" />
      <Skeleton className="h-[140px] w-[350px]" />
    </div>
  );
};

export default EventPoolListSkeleton;
