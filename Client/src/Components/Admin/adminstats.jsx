// src/Chart.js
import React, { useState, useEffect } from 'react';
import './chart.css';
import AdminNavbar from './adminnavbar';

const Chart = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [systemStats, setSystemStats] = useState({});

  useEffect(() => {
    // Fetch event data
    fetch('http://localhost:5050/event/api/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));

    
    fetch('http://localhost:5050/event/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

    
    fetch('http://localhost:5050/event/api/system-stats')
      .then((response) => response.json())
      .then((data) => setSystemStats(data))
      .catch((error) => console.error('Error fetching system stats:', error));
  }, []);

  const maxEventCount = Math.max(...events.map((event) => event.count)); 

  return (
    <div>
        <AdminNavbar/>
  
    <div className="chart-container pt-5 mt-5">
      <h2 className="text-center">Monthly Event Data</h2>
      <div className="chart">
        {events.map((event, index) => (
          <div
            className="bar"
            key={index}
            style={{
              height: maxEventCount ? `${(event.count / maxEventCount) * 100}%` : '0%', // Dynamically scale the bars
            }}
          >
            <span>{event.count}</span>
          </div>
        ))}
      </div>
      <div className="labels">
        {events.map((event, index) => (
          <div key={index} className="label">
            {event.month}
          </div>
        ))}
      </div>

      {/* Render Users and System Stats as Tables */}
      <div className="tables-container">
        {/* Users Table */}
        <div className="table">
          <h3>Users Overview</h3>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>User Count</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.month}</td>
                  <td>{user.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System Stats Table */}
        <div className="table">
          <h3>System Stats</h3>
          <table>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Events</td>
                <td>{systemStats.totalEvents}</td>
              </tr>
              <tr>
                <td>Total Users</td>
                <td>{systemStats.totalUsers}</td>
              </tr>
              <tr>
                <td>Total Active Users</td>
                <td>{systemStats.totalActiveUsers}</td>
              </tr>
              <tr>
                <td>System Uptime</td>
                <td>{systemStats.uptime}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Chart;
