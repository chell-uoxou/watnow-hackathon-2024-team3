"use client";

import { useState, useEffect } from "react";
import Map from "~/features/googleMap/components/Map";
import { Location } from "./types/location";

interface MapDrawerProps {
  show: boolean;
}

const MapDrawer = (props: MapDrawerProps) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  const [mapCenter, setMapCenter] = useState<Location>({
    lat: 34.809897, // 初期のデフォルト位置（OICの緯度）
    lng: 135.561208, // 初期のデフォルト位置（OICの経度）
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(newLocation);
        setMapCenter(newLocation); // 現在位置を地図の中心に設定
        console.log(position.coords);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col h-full ${
        props.show ? "w-[33.33vw]" : "w-0"
      }`}
    >
      <div>地図</div>
      <Map
        currentLocation={currentLocation ?? undefined}
        defaultCenter={currentLocation ? currentLocation : mapCenter}
      />
    </div>
  );
};

export default MapDrawer;
