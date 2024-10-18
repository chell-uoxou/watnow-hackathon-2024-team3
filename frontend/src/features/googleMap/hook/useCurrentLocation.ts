import { useEffect } from "react";

interface UseCurrentLocationProps {
  map: google.maps.Map | null;
  position: google.maps.LatLngLiteral;
}

export function useCurrentLocation({ map, position }: UseCurrentLocationProps) {
  useEffect(() => {
    if (!map) return;
    // 薄い青色の円を描画
    const circle = new google.maps.Circle({
      strokeColor: "#115EC3",
      strokeOpacity: 0.2,
      strokeWeight: 1,
      fillColor: "#115EC3",
      fillOpacity: 0.2,
      map: map,
      center: position,
      radius: 100,
    });

    // 濃い青色のマーカーを描画
    const marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#115EC3",
        fillOpacity: 1,
        strokeColor: "white",
        strokeWeight: 2,
        scale: 7,
      },
    });
    // クリーンアップ時に円とマーカーを削除する
    return () => {
      circle.setMap(null);
      marker.setMap(null);
    };
  }, [map, position]);
}
