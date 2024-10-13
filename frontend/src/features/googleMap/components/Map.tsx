"use client";
import { useState, useRef, useEffect } from "react";
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { SetCurrentLocationMaker } from "./SetCurrentLocationMaker";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
};

interface MapProps {
  currentLocation: {
    lat: number | null;
    lng: number | null;
  };
  defaultCenter: {
    lat: number;
    lng: number;
  };
}

export default function Map({ currentLocation, defaultCenter }: MapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState(defaultCenter);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  useEffect(() => {
    // currentLocationが変更されたときにmap centerを更新する
    if (currentLocation.lat !== null && currentLocation.lng !== null) {
      setCenter({
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      });
    }
  }, [currentLocation]);

  // マップインスタンスをセットする
  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  // マップアンロード時にインスタンスをクリア
  const onUnmount = () => {
    setMap(null);
  };

  // 検索ボックスのロード時にインスタンスをセット
  const onSearchBoxLoad = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  };

  // 検索結果の処理
  const onPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const location = place.geometry?.location;
      if (location) {
        // 検索結果の位置に地図の中心を移動
        setCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
        map?.panTo({ lat: location.lat(), lng: location.lng() });
      }
    }
  };

  // Google Map のオプションを定義
  const mapOptions = {
    disableDefaultUI: true, // デフォルトのUIを無効化
    zoomControl: true, // ズームコントロールを有効化
    streetViewControl: false, // ストリートビューコントロールを無効化
    mapTypeControl: false, // マップタイプ（航空写真）コントロールを無効化
  };

  return (
    <div className="grow rounded-lg bg-clip-border relative">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
        libraries={["places"]} // "places" ライブラリをロード
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions} // オプションを設定
        >
          {/* 検索ボックス */}
          <div className="absolute top-4 left-4 z-10 w-80">
            <StandaloneSearchBox
              onLoad={onSearchBoxLoad} // 検索ボックスのロード時の処理
              onPlacesChanged={onPlacesChanged} // 検索結果変更時の処理
            >
              <input
                type="text"
                placeholder="地名を検索"
                className="w-full p-2 rounded-lg border border-gray-300"
              />
            </StandaloneSearchBox>
          </div>

          {/* 現在位置の表示 */}
          {currentLocation.lat !== null &&
            currentLocation.lng !== null &&
            map && (
              <SetCurrentLocationMaker
                map={map}
                position={{
                  lat: currentLocation.lat,
                  lng: currentLocation.lng,
                }}
              />
            )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
