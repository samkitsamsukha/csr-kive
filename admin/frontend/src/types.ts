export interface Submission {
  _id: string;
  employeeId: string;
  employeeName: string;
  eventName: string;
  eventReport: string;
  eventPicture: string;
  coins: number;
  submittedAt: Date;
}

export interface Event {
  _id: string;
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  eventDescription: string;
  eventImage: string;
  rewardAmount: number;
  eventSummary: string;
  submissions: Submission[];
}

export interface Employee {
  _id: string;
  name: string;
  company: string;
  coins: number;
  events: Submission[];
}

export interface Admin {
  orgName: string;
  vision: string;
  logo: string;
  mission: string;
  events: Event[];
  employees: Employee[];
}