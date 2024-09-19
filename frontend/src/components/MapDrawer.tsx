"use client"; // これを最初に追加
import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, InfoWindow } from "@react-google-maps/api";
import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "~/components/ui/sheet";

interface Location {
  lat: number | null;
  lng: number | null;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",  // Fixed camelCase
};

const MakeMap: React.FC = () => {
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
      <SheetContent
        side={side}
        className="flex flex-col min-w-screen h-3/4 "
      >
        <SheetHeader>
          {/* <SheetTitle>a</SheetTitle>
          <SheetDescription>メンバ一覧</SheetDescription> */}
        </SheetHeader>
        <div className="grow rounded-lg bg-clip-border">
          <LoadScript googleMapsApiKey="AIzaSyAkePaK5Cef7L8zD-A59U2dxk0t2jFEExg">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={
                currentLocation.lat !== null && currentLocation.lng !== null
                  ? { lat: currentLocation.lat, lng: currentLocation.lng }
                  : defaultCenter
              }
              zoom={17}
            >
              {currentLocation.lat !== null && currentLocation.lng !== null && (
                <InfoWindow
                  position={{
                    lat: currentLocation.lat,
                    lng: currentLocation.lng,
                  }}
                >
                  <div>You are here!</div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MakeMap;
