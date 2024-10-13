"use client";

import { useState, useEffect } from "react";
import Map from "~/features/googleMap/components/Map";

interface Location {
  lat: number | null;
  lng: number | null;
}

interface MapDrawerProps {
  show: boolean;
}

const MapDrawer = (props: MapDrawerProps) => {
  const [currentLocation, setCurrentLocation] = useState<Location>({
    lat: null,
    lng: null,
  });

  const [mapCenter, setMapCenter] = useState<Location>({
    lat: 34.809897, // 初期のデフォルト位置（OICの緯度）
    lng: 135.561208, // 初期のデフォルト位置（OICの経度）
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
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

  // mapCenterがnullでないことを確認してからMapに渡す
  const validMapCenter = {
    lat: currentLocation.lat !== null ? currentLocation.lat : mapCenter.lat, // latがnullでないことを確認
    lng: currentLocation.lng !== null ? currentLocation.lng : mapCenter.lng, // lngがnullでないことを確認
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col h-full ${
        props.show ? "w-[33.33vw]" : "w-0"
      }`}
    >
      <div>地図</div>
      <Map currentLocation={currentLocation} defaultCenter={validMapCenter} />
      {/* const validMapCenter = の部分のcurrentLocation.lng と mapCenter.lngを具体的な数値にしないとエラーが出るそうするとmapCenterあたりからエラーが出る */}
    </div>
  );
};

export default MapDrawer;
