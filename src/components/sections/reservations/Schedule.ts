export interface Schedule {
  id: number;
  date: string;
  start: string; // "10:00 AM"
  end: string; // "10:30 AM"
  available: boolean;
}
