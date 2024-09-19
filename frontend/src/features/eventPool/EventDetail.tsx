import { Check, Hourglass, Map, PiggyBank, Text } from "lucide-react";
import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type Props = {
  title: string;
  description?: string;
  location?: string;
  available_times: Array<string>;
  value?: number;
  preparation_task?: string;
  notes?: string;
};

export function EventDetail({
  title,
  description = "未記入",
  location = "未記入",
  available_times,
  value = 0,
  preparation_task = "未記入",
  notes = " ",
}: Props) {
  /**
   * 開館時間をいい感じに書き換えてくれるやつ
   */
  const formatTimes = useCallback((times: Array<string>) => {
    // TODO　現状は開始時間と終了時間から時間帯を表示しているが、今後は平日は何時やいつは何時と表形式にしたい。
    const [startTime, endTime] = times;
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const sameDay = startDate.toDateString() === endDate.toDateString();
    const startFormatted = startDate.toLocaleString("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const endFormatted = endDate.toLocaleString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      ...(sameDay ? {} : { year: "numeric", month: "numeric", day: "numeric" }),
    });

    if (sameDay) {
      return `${startFormatted} ~ ${endFormatted}`;
    } else {
      return `${startFormatted} ~ ${endFormatted}`;
    }
  }, []);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="col-auto flex flex-col gap-x-0 gap-y-3">
          <div className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-start justify-start gap-x-1 text-sm">
            <Hourglass className="w-3.5 h-3.5 mt-1" />
            {formatTimes(available_times)}
          </div>
          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-start gap-x-1">
            <Map className="w-3.5 h-3.5" />
            {location}
          </div>
          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-start gap-x-1">
            <PiggyBank className="w-3.5 h-3.5" />
            {value}円
          </div>
          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-start gap-x-1">
            <Check className="w-3.5 h-3.5" />
            {preparation_task}
          </div>
          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-start gap-x-1">
            <Text className="w-3.5 h-3.5" />
            {notes}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
