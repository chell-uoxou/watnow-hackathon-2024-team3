"use client";
import { useState, useEffect, useRef } from "react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";
import { SetCurrentLocationMaker } from "./SetCurrentLocationMaker";
import SearchBox from "./SearchBox";
import { Location } from "../types/location";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
};

interface MapProps {
  currentLocation?: Location;
  defaultCenter: Location;
}

export default function Map({ currentLocation, defaultCenter }: MapProps) {
  const map = useRef<google.maps.Map | null>(null); // Google Mapsインスタンスを保持するための状態
  const [center, setCenter] = useState(defaultCenter); // 地図の中心位置を管理するための状態
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null); // SearchBoxの参照を保持

  useEffect(() => {
    // currentLocationが変更されたときに地図の中心を更新
    if (currentLocation) {
      setCenter({
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      });
    }
  }, [currentLocation]);

  // マップがロードされたときに呼ばれる関数
  const onLoad = (mapInstance: google.maps.Map) => {
    map.current = mapInstance; // マップインスタンスを状態にセット
  };

  // マップがアンロードされたときに呼ばれる関数
  const onUnmount = () => {
    map.current = null; // マップインスタンスをクリア
  };

  // SearchBoxがロードされたときに呼ばれる関数
  const onSearchBoxLoad = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref; // SearchBoxのインスタンスを保存
  };

  // 検索ボックスで場所が変更されたときの処理
  const onPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces(); // 検索結果の取得
    if (places && places.length > 0) {
      const place = places[0]; // 最初の場所を取得
      const location = place.geometry?.location; // 場所の位置情報を取得
      if (location) {
        // 検索結果の位置に地図の中心を移動
        setCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
        map.current?.panTo({ lat: location.lat(), lng: location.lng() });
      }
    }
  };

  // Google Maps APIのオプションを設定
  const mapOptions = {
    disableDefaultUI: true, // デフォルトのUIを無効化
    zoomControl: true, // ズームコントロールを有効化
    streetViewControl: false, // ストリートビューコントロールを無効化
    mapTypeControl: false, // マップタイプコントロールを無効化
  };

  return (
    <div className="grow rounded-lg bg-clip-border relative">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
        libraries={["places"]} // "places"ライブラリをロード
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17} // ズームレベルの設定
          onLoad={onLoad} // マップロード時の処理
          onUnmount={onUnmount} // マップアンロード時の処理
          options={mapOptions} // マップオプションを設定
        >
          {/* 検索ボックスを地図に配置  現在試行錯誤中につき不可視化 */}
          <div className="flex w-full z-10 justify-center absolute top-4 invisible">
            <SearchBox
              onLoad={onSearchBoxLoad} // 検索ボックスロード時の処理を設定
              onPlacesChanged={onPlacesChanged} // 検索結果変更時の処理を設定
            />
          </div>

          {/* 現在位置の表示 */}
          {currentLocation && map && (
            <SetCurrentLocationMaker
              map={map.current}
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
