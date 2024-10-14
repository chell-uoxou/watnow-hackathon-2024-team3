"use client";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

interface SearchBoxProps {
  onPlacesChanged: () => void; // 場所が変更された時のイベントハンドラ
  onLoad: (ref: google.maps.places.SearchBox) => void; // SearchBoxがロードされた時のイベントハンドラ
}

const SearchBox: React.FC<SearchBoxProps> = () => {
  return (
    <div className="flex z-10">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="地名を検索" />
        <Button type="submit">検索</Button>
      </div>
    </div>
  );
};

export default SearchBox;
