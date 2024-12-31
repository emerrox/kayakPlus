export interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
  }
  
export interface CalendarProps {
events: Event[];
}

