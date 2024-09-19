"use client";
import React, { FormEventHandler, useState } from "react";
import { Input } from "~/components/ui/input";
import { Hamburger } from "~/components/Hamburger";
import { DateTimePicker } from "~/components/ui/datetimepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea"
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button"
import { X } from 'lucide-react';


function page() {
  const [dateTime, setDateTime] = useState(new Date());
  const [isPreparationChecked, setIsPreparationChecked] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsPreparationChecked(checked);
  };

  return (
    <div className="max-w-{size} py-5">
      <header className="flex flex-row-reverse">
        <Button  onClick={() => window.close()} className="ml-2"> 
          <X className="h-4 w-4" />
        </Button>
        <header className="text-lg my-90 absolute left-0">イベント追加</header>
      </header>
      <div className="pb-20">
        <div className="text-sm max-w-{size} text-left">名前</div>
        <div>
          <Input id="name" className="max-w-{size} mb-12" />
        </div>
        <div className="text-sm max-w-{size} text-left">説明</div>
        <div>
          <Input id="description" className="max-w-{size} mb-12" />
        </div>
        <div className="text-sm max-w-{size} text-left">場所</div>
        <div>
          <Input id="location" className="max-w-{size} mb-12" />
        </div>
        <div className="flex">
          <div className="text-sm w-full lg:w-1/2 text-left ">開始日時</div>
          <div className="text-sm w-full lg:w-1/2 text-left ">終了日時</div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-2 w-full lg:w-1/2">
            <DateTimePicker
              value={dateTime}
              onChange={(e) => e && setDateTime(e)}
            />
          </div>
          <div className="flex-1 pl-2 w-full lg:w-1/2">
            <DateTimePicker
              value={dateTime}
              onChange={(e) => e && setDateTime(e)}
            />
          </div>
        </div>
        <div className="text-sm max-w-{size} text-left mt-12">所要時間</div>
        <div>
          <Input id="" className="max-w-{size} mb-12" />
        </div>
        <div className="flex">
          <div className="text-sm w-full lg:w-1/2 text-left ">
            1人あたり/合算
          </div>
          <div className="text-sm w-full lg:w-1/2 text-left ">予算(円)</div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-2 w-full lg:w-1/2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">1人あたり</SelectItem>
                <SelectItem value="dark">合算</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 pl-2 w-full lg:w-1/2">
            <div>
              <Input id="value" className="max-w-{size}" />
            </div>
          </div>
        </div>
        <div className="text-sm max-w-{size} text-left mt-12">
          準備が必要な場合は記述
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="preparation"
            checked={isPreparationChecked}
            onCheckedChange={handleCheckboxChange}/>
          <label
            htmlFor="preparation"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            準備あり
          </label>
        </div>
        <div>
          <Input
            id="preparation"
            className="max-w-{size} mb-12"
            disabled={!isPreparationChecked}
          />
        </div>
        <div className="text-sm max-w-{size} text-left">最大人数</div>
        <div>
          <Input id="participants" className="max-w-{size} mb-12" />
        </div>
        <div className="text-sm max-w-{size} text-left">メモ</div>
        <div className="flex flex-wrap">
          {/* <Input id="memo" className="max-w-{size} mb-12 h-24 flex flex-row flex-wrap" /> */}
          <Textarea id="memo" className="max-w-{size} mb-12 h-24" />
        </div>
        <div className="flex flex-row-reverse pr-5">
          <Button className="">追加</Button>
          <Button variant="destructive" className="mr-4">キャンセル</Button>
        </div>
      </div>
    </div>
  );
}

export default page;
