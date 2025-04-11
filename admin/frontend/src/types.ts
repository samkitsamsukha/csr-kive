export interface Submission {
  id: string;
  employeeId: string;
  employeeName: string;
  report: string;
  picture: string;
  coins: number;
  submittedAt: Date;
}

export interface Event {
  id: string;
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
  id: string;
  name: string;
  department: string;
  position: string;
  avatar: string;
  totalCoins: number;
  submissions: Submission[];
}

export interface Admin {
  orgName: string;
  vision: string;
  logo: string;
  mission: string;
  events: Event[];
  employees: Employee[];
}