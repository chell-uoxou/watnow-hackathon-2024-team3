"use client";
import React, { FormEventHandler, useState } from "react";
import { Input } from "~/components/ui/input";
import { DateTimePicker } from "~/components/ui/datetimepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";

import { collection, Timestamp } from "firebase/firestore";
import { db } from "~/lib/firebase";
import { useFirestoreCollection } from "~/hooks/useFirestoreCollection";
import { EventPool } from "~/models/types/event_pool";
import { BudgetMode } from "~/models/types/common";
import useCurrentAccount, { isReady } from "~/hooks/useCurrentAccount";

function EventForm() {
  const currentAccount = useCurrentAccount();
  console.log(currentAccount);

  const eventsCollection = isReady(currentAccount)
    ? collection(db, "accounts", currentAccount.uid, "event_pool")
    : null;
  const { add } = useFirestoreCollection<EventPool>(eventsCollection);

  // 各入力フィールドの状態を管理
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [budgetType, setBudgetType] = useState<BudgetMode>("per_person");
  const [budget, setBudget] = useState("");
  const [isPreparationChecked, setIsPreparationChecked] = useState(false);
  const [preparationDetails, setPreparationDetails] = useState("");
  const [participants, setParticipants] = useState("");
  const [memo, setMemo] = useState("");

  const handleCheckboxChange = (checked: boolean) => {
    setIsPreparationChecked(checked);
  };

  // ステップ2: フォームの送信処理
  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const sendData = {
      title: name,
      description: description,
      location: location,
      attached_image: "",
      available_times: [
        {
          start_time: Timestamp.fromDate(startDateTime),
          end_time: Timestamp.fromDate(endDateTime),
        },
      ],
      default_duration: Number(duration),
      default_budget: {
        mode: budgetType,
        value: Number(budget),
      },
      needs_preparation: isPreparationChecked,
      preparation_task: preparationDetails,
      max_participants: Number(participants),
      notes: memo,
    };

    try {
      await add(sendData);
      alert("イベントが正常に追加されました！");
      // フォームをリセット
      resetForm();
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setLocation("");
    setStartDateTime(new Date());
    setEndDateTime(new Date());
    setDuration("");
    setBudgetType("per_person");
    setBudget("");
    setIsPreparationChecked(false);
    setPreparationDetails("");
    setParticipants("");
    setMemo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-{size} py-5">
        <header className="flex flex-row-reverse">
          <Button onClick={() => window.close()} className="ml-2">
            <X className="h-4 w-4" />
          </Button>
          <header className="text-lg my-90 absolute left-0">
            イベント追加
          </header>
        </header>
        <div className="pb-20">
          <div className="text-sm max-w-{size} text-left">名前</div>
          <div>
            <Input
              name="name"
              id="name"
              className="max-w-{size} mb-12"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="text-sm max-w-{size} text-left">説明</div>
          <div>
            <Input
              name="description"
              id="description"
              className="max-w-{size} mb-12"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="text-sm max-w-{size} text-left">場所</div>
          <div>
            <Input
              name="location"
              id="location"
              className="max-w-{size} mb-12"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex">
            <div className="text-sm w-full lg:w-1/2 text-left">開始日時</div>
            <div className="text-sm w-full lg:w-1/2 text-left">終了日時</div>
          </div>
          <div className="flex">
            <div className="flex-1 pr-2 w-full lg:w-1/2">
              <DateTimePicker
                value={startDateTime}
                onChange={(e) => e && setStartDateTime(e)}
              />
            </div>
            <div className="flex-1 pl-2 w-full lg:w-1/2">
              <DateTimePicker
                value={endDateTime}
                onChange={(e) => e && setEndDateTime(e)}
              />
            </div>
          </div>
          <div className="text-sm max-w-{size} text-left mt-12">
            所要時間(分)
          </div>
          <div>
            <Input
              name="time"
              id="time"
              className="max-w-{size} mb-12"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="flex">
            <div className="text-sm w-full lg:w-1/2 text-left ">
              1人あたり/合算
            </div>
            <div className="text-sm w-full lg:w-1/2 text-left">予算(円)</div>
          </div>
          <div className="flex">
            <div className="flex-1 pr-2 w-full lg:w-1/2">
              <Select
                onValueChange={(value) => setBudgetType(value as BudgetMode)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per_person">1人あたり</SelectItem>
                  <SelectItem value="total">合算</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 pl-2 w-full lg:w-1/2">
              <div>
                <Input
                  name="value"
                  id="value"
                  className="max-w-{size}"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
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
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor="preparation"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              準備あり
            </label>
          </div>
          <div>
            <Input
              name="preparation"
              id="preparation"
              className="max-w-{size} mb-12"
              disabled={!isPreparationChecked}
              value={preparationDetails}
              onChange={(e) => setPreparationDetails(e.target.value)}
            />
          </div>
          <div className="text-sm max-w-{size} text-left">最大人数</div>
          <div>
            <Input
              name="participants"
              id="participants"
              className="max-w-{size} mb-12"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </div>
          <div className="text-sm max-w-{size} text-left">メモ</div>
          <div className="flex flex-wrap">
            <Textarea
              name="memo"
              id="memo"
              className="max-w-{size} mb-12 h-24"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
          <div className="flex flex-row-reverse pr-5">
            <Button type="submit" className="">
              追加
            </Button>
            <Button variant="destructive" className="mr-4" onClick={resetForm}>
              キャンセル
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EventForm;
