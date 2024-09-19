
import { EventDetail } from "~/components/EventDetail";
import { EventsForList } from "~/components/EventsForList";
import { Hamburger } from "~/components/Hamburger";
import Map from "~/components/MapDrawer";

export default function test() {
  return (
    <div>
      <Hamburger />
      <Map />
      <EventsForList 
      title="京都国立博物館"
      description="特別展を見学"
      location="京都府京都市東山区"
      available_times={["2024-10-20T09:00:00", "2024-10-20T18:00:00"]}
      value={0}
      preparation_task="予習"
      notes="notes"
      ></EventsForList>
        <EventsForList 
       title="京都国立博物館"
       description="特別展を見学adsdgnslnflnslfglsnfgnsldfngljsflgnlsnfglslgnl"
       location="京都府京都市東山区"
       available_times={["2024-10-20T09:00:00", "2024-10-22T18:00:00"]}
       value={0}
       notes="notes"
      ></EventsForList>
    </div>
  );
}
