import clsx from "clsx";

import { useState, useEffect } from "react";
import Map from "~/features/googleMap/components/Map";
import { Location } from "./types/location";

interface MapDrawerProps {
  show: boolean;
}

const MapDrawer = (props: MapDrawerProps) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  // 初期のデフォルト位置（OICの緯度）
  const [mapCenter, setMapCenter] = useState<Location>({
    lat: 34.809897,
    lng: 135.561208,
  });
  // ブラウザのAPIから現在位置を取得し状態MapCenterを更新
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(newLocation);
        setMapCenter(newLocation);
        console.log(position.coords);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <div
      className={clsx(
        "transition-all duration-300 ease-in-out overflow-hidden flex flex-col h-full",
        props.show ? "w-[33.33vw]" : "w-0"
      )}
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
