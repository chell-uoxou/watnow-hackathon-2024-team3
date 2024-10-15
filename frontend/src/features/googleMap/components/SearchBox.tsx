"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useDebouncedCallback } from "use-debounce";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

// 候補の型を定義
interface PlacePrediction {
  place_id: string; // プレースID
  description: string; // プレースの説明
  structured_formatting?: { main_text: string; secondary_text: string }; // 構造化されたフォーマット
}

interface SearchBoxProps {
  onAddressSelect: (lat: number, lng: number) => void; // 親コンポーネントに住所選択を通知
}

export default function SearchBox({ onAddressSelect }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState<string>(""); // 入力値の状態
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]); // 候補の状態
  const [isOpen, setIsOpen] = useState<boolean>(false); // 候補表示のフラグ
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null); // 選択した候補のプレースID
  const inputRef = useRef<HTMLInputElement>(null); // 入力フィールドの参照

  // 候補が変更された場合のフラグ
  useEffect(() => {
    setIsOpen(inputValue.length > 0 && suggestions.length > 0);
  }, [inputValue, suggestions]);

  // Google Places APIで候補を取得する処理をデバウンス付きで定義
  const fetchSuggestions = useDebouncedCallback((inputValue: string) => {
    if (inputValue) {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: inputValue },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions || []);
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  }, 500); // 3秒のデバウンスを設定

  // 入力の変更を監視し、fetchSuggestionsを呼び出す
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 入力値を更新
    fetchSuggestions(e.target.value); // 3秒間隔でGoogle Places APIを呼び出す
  };

  const handleSuggestionClick = (place: PlacePrediction) => {
    setInputValue(place.description); // 入力フィールドに住所を設定
    setSelectedPlaceId(place.place_id); // 選択したプレースIDを保存
    setIsOpen(false); // 候補を閉じる
    inputRef.current?.focus(); // 入力フィールドにフォーカス
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlaceId) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ placeId: selectedPlaceId }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location; // 緯度と経度を取得
          onAddressSelect(location.lat(), location.lng()); // 親コンポーネントに選択した住所を通知
        }
      });
    }
    console.log("Submitted:", inputValue); // 送信された住所をコンソールに表示

    // 検索窓をリセット
    setInputValue(""); // 入力値をリセット
    setSuggestions([]); // 候補もリセット
    setSelectedPlaceId(null); // 選択したプレースIDもリセット
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="地名を検索"
          value={inputValue}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <Button type="submit">検索</Button>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full z-10">
          <Command>
            <CommandList>
              <CommandGroup>
                {suggestions.map((place) => (
                  <CommandItem
                    key={place.place_id}
                    onSelect={() => handleSuggestionClick(place)} // 候補を選択した際に住所を設定
                  >
                    {place.structured_formatting?.main_text ||
                      place.description}{" "}
                    {/* 構造化されたフォーマットから施設名を表示 */}
                  </CommandItem>
                ))}
              </CommandGroup>
              {suggestions.length === 0 && (
                <CommandEmpty>見つかりませんでした</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </form>
  );
}
