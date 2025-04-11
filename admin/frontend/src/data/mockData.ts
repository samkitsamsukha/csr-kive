import { Admin } from '../types';

export const mockData: Admin = {
  orgName: "TechCare Solutions",
  vision: "Creating positive impact through technology",
  logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  mission: "To empower communities through sustainable tech initiatives",
  events: [
    {
      id: "evt1",
      eventName: "Green Tech Workshop",
      eventDate: new Date('2024-03-15'),
      eventLocation: "Tech Hub, Downtown",
      eventDescription: "A workshop focusing on sustainable technology practices and environmental awareness",
      eventImage: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rewardAmount: 500,
      eventSummary: "",
      submissions: [
        {
          id: "sub1",
          employeeId: "emp1",
          employeeName: "John Doe",
          report: "Conducted session on e-waste management",
          picture: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          coins: 50,
          submittedAt: new Date('2024-03-16')
        },
        {
          id: "sub2",
          employeeId: "emp2",
          employeeName: "Jane Smith",
          report: "Organized recycling drive",
          picture: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          coins: 75,
          submittedAt: new Date('2024-03-17')
        }
      ]
    },
    {
      id: "evt2",
      eventName: "Code for Community",
      eventDate: new Date('2024-04-01'),
      eventLocation: "Community Center",
      eventDescription: "Teaching basic coding skills to underprivileged youth",
      eventImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rewardAmount: 750,
      eventSummary: "",
      submissions: [
        {
          id: "sub3",
          employeeId: "emp3",
          employeeName: "Mike Johnson",
          report: "Taught Python basics to 20 students",
          picture: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          coins: 100,
          submittedAt: new Date('2024-04-02')
        }
      ]
    }
  ],
  employees: [
    {
      id: "emp1",
      name: "John Doe",
      department: "Engineering",
      position: "Senior Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      totalCoins: 50,
      submissions: []
    },
    {
      id: "emp2",
      name: "Jane Smith",
      department: "Design",
      position: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      totalCoins: 75,
      submissions: []
    },
    {
      id: "emp3",
      name: "Mike Johnson",
      department: "Engineering",
      position: "Developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      totalCoins: 100,
      submissions: []
    }
  ]
};

// Populate employee submissions
mockData.employees.forEach(employee => {
  employee.submissions = mockData.events.flatMap(event =>
    event.submissions.filter(sub => sub.employeeId === employee.id)
  );
});