// SearchBox.tsx
"use client";
import React, { useRef } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";

interface SearchBoxProps {
  onPlacesChanged: () => void; // 場所が変更された時のイベントハンドラ
  onLoad: (ref: google.maps.places.SearchBox) => void; // SearchBoxがロードされた時のイベントハンドラ
}

const SearchBox: React.FC<SearchBoxProps> = ({ onPlacesChanged, onLoad }) => {
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null); // SearchBoxの参照を保持するためのuseRef

  return (
    <div className="flex z-10">
      <StandaloneSearchBox
        onLoad={(ref) => {
          searchBoxRef.current = ref; // SearchBoxのインスタンスを保存
          onLoad(ref); // 親コンポーネントのonLoadを呼び出す
        }}
        onPlacesChanged={onPlacesChanged} // onPlacesChangedプロパティに渡されたハンドラを使用する
      >
        <input
          type="text"
          placeholder="地名を検索" // 検索ボックスのプレースホルダ
          className="w-full p-2 rounded-lg border border-gray-300" // 検索ボックスのスタイル
        />
      </StandaloneSearchBox>
    </div>
  );
};

export default SearchBox;
