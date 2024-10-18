import { Card, CardContent } from "~/components/ui/card";
import { PropsWithIcon } from "./components/PropsWithIcon";
import { CalendarRange, Map } from "lucide-react";
import clsx from "clsx";
import { DBEventPoolItem } from "~/lib/firestore/utils";

interface DayTimelineEventProps {
  event: DBEventPoolItem;
  isDragging?: boolean;
}

export const DayTimelineEvent = ({
  event,
  isDragging,
}: DayTimelineEventProps) => {
  return (
    <div>
      <Card className={clsx(isDragging && "shadow-lg")}>
        <CardContent className="py-4 px-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-bold">{event.title}</h1>
            {(event.location !== "" || !isDragging) && (
              <div className="flex flex-col gap-1.5 ">
                {event.location !== "" && (
                  <PropsWithIcon
                    icon={<Map size={14} />}
                    value={event.location}
                  />
                )}
                {!isDragging && (
                  <PropsWithIcon
                    icon={<CalendarRange size={14} />}
                    value={event.location}
                  />
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
