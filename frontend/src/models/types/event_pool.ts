import { Timestamp } from "firebase/firestore";

export default interface EventPool {
  title: string;
  description: string;
  location: string;
  attached_image: string;
  available_times: {
    start_time: Timestamp;
    end_time: Timestamp;
  };
  default_duration: number;
  default_budget: {
    mode: string;
    value: number;
  };
  needs_preparation: boolean;
  preparation_task: string;
  max_participants: number;
  notes: string;
}
