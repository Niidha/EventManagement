// src/data.js

// Event data
export const events = [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 15 },
    { month: "Mar", count: 10 },
    { month: "Apr", count: 30 },
    { month: "May", count: 25 },
    { month: "Jun", count: 20 },
  ];
  
  // Users data
  export const users = [
    { month: "Jan", count: 400 },
    { month: "Feb", count: 500 },
    { month: "Mar", count: 550 },
    { month: "Apr", count: 600 },
    { month: "May", count: 650 },
    { month: "Jun", count: 700 },
  ];
  
  // System Stats data
  export const systemStats = {
    uptime: 85, // percentage uptime
    totalEvents: events.reduce((acc, e) => acc + e.count, 0),
    totalUsers: 1200,
    totalActiveUsers: 800,
  };
  