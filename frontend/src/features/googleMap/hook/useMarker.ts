import { useEffect } from "react";

interface UseCurrentLocationProps {
  map: google.maps.Map | null;
  positions: google.maps.LatLngLiteral[];
  group: "undecided" | "decided";
}

export function useMarker(props: UseCurrentLocationProps) {
  useEffect(() => {
    if (!props.map) return;

    const markers = props.positions.map((position) => {
      let markerColor = "";

      if (props.group === "undecided") {
        markerColor = "green-dot.png"; // 候補のイベントの色
      } else {
        markerColor = "red-dot.png"; // 日程に追加されイベントの色
      }

      // マーカーを作成
      return new google.maps.Marker({
        position: position,
        map: props.map,
        icon: {
          url: `http://maps.google.com/mapfiles/ms/icons/${markerColor}`,
        },
      });
    });

    // コンポーネントがアンマウントされたときにすべてのマーカーを削除
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [props.map, props.positions, props.group]);
}
