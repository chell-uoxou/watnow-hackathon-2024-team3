"use client";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const SearchBox = () => {
  return (
    <div className="flex z-10">
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input type="text" placeholder="地名を検索" />
        <Button type="submit">検索</Button>
      </div>
    </div>
  );
};

export default SearchBox;
