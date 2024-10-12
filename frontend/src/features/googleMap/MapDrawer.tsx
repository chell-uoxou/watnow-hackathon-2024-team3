"use client"; // これを最初に追加

import { useState, useEffect } from "react";
import Map from "~/features/googleMap/components/Map";

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

  const defaultCenter = {
    lat: 35.69575,
    lng: 139.77521,
  };

  return (
    <div className="flex flex-col w-screen h-full" style={{ width: "33.33vw" }}>
      <div>地図</div>
      <Map currentLocation={currentLocation} defaultCenter={defaultCenter} />
    </div>
  );
};

export default MapDrawer;
