"use client"; // これを最初に追加
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import Map from "~/features/googleMap/Map";

interface Location {
  lat: number | null;
  lng: number | null;
}

const MapDrawer = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        console.log(position.coords);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const side = "bottom";

  const defaultCenter = {
    lat: 35.69575,
    lng: 139.77521,
  };

  return (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="flex flex-col min-w-screen h-3/4 ">
        <SheetHeader>地図</SheetHeader>
        <Map currentLocation={currentLocation} defaultCenter={defaultCenter} />
      </SheetContent>
    </Sheet>
  );
};

export default MapDrawer;
