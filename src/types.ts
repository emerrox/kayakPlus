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
  role:string
}

export interface Group_extended {
  id: string;
  name: string;
  calendar_id: string;
  role: string;
  users: User_lite[];
}

export interface User {
  email: string;
  name: string;
  picture: string;
  token: string;
}

export interface User_lite {
  name: string;
  id: string;
  email: string;
  role: string;
}

export interface creteEventProps {groupId: string, summary: string, startTime: string, endTime:string, description: string}