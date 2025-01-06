export interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
  }
  
export interface CalendarProps {
events: Event[];
}

export interface Groups {
  id: string;
  name: string;
}

export interface User {
  email: string;
  name: string;
  picture: string;
  token: string;
}