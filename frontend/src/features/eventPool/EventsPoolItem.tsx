"use client";
import * as React from "react";
import { useState } from "react";
import { Hourglass, Map } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { EventDetail } from "./EventDetail"; // Import the EventDetail component

type Props = {
  title: string;
  description?: string;
  location?: string;
  available_times: Array<string>;
  value?: number;
  preparation_task?: string;
  notes?: string;
};

export default function EventPoolItem({
  title,
  description = "未記入",
  location = "未記入",
  available_times,
  value = 0,
  preparation_task = "未記入",
  notes = " ",
}: Props) {
  const [showDetail, setShowDetail] = useState(false); // State to track if popup is visible
  // TODO　現状は開始時間と終了時間から時間帯を表示しているが、今後は平日は何時やいつは何時と表形式にしたい。
  const formatTimes = (times: Array<string>) => {
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

    return sameDay
      ? `${startFormatted} ~ ${endFormatted}`
      : `${startFormatted} ~ ${endFormatted}`;
  };

  return (
    <div
      onMouseEnter={() => setShowDetail(true)} // Show popup on hover
      onMouseLeave={() => setShowDetail(false)} // Hide popup when hover ends
      className="relative w-[350px]"
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
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
          </div>
        </CardContent>
      </Card>

      {/* Conditionally render the EventDetail popup */}
      {showDetail && (
        <div className="absolute top-0 left-0 z-10 w-[350px] bg-white shadow-lg rounded-lg">
          <EventDetail
            title={title}
            description={description}
            location={location}
            available_times={available_times}
            value={value}
            preparation_task={preparation_task}
            notes={notes}
          />
        </div>
      )}
    </div>
  );
}
