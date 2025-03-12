import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { api } from "../../axios";
import AdminNavbar from "./adminnavbar";
import { useSelector } from "react-redux";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const roles = ["user", "admin"]; 
  const {username}=useSelector((state) => state.user);


  
  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Suspend/Reactivate User
  const handleSuspend = async (userId, status) => {
    const action = status === "active" ? "Suspend" : "Reactivate";
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

    try {
      await api.patch(`/admin/users/suspend/${userId}`);
      toast.success(`User ${action.toLowerCase()}d successfully.`);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  // Delete User
  const handleDelete = async (userId, status) => {
    if (status === "suspended") return; // Prevent deletion of suspended users

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      toast.success("User deleted.");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  // Update User Role
  const handleRoleUpdate = async (userId, newRole) => {
    if (!window.confirm(`Are you sure you want to change the role to ${newRole}?`)) return;

    try {
      await api.put(`/admin/role/${userId}`, { role: newRole });
      toast.success("User role updated successfully.");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role.");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-6 w-full min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center p-5">
          User Management
        </h2>

        <div className="overflow-x-auto w-full">
          <table className="w-full bg-white shadow-lg rounded-lg border border-gray-300">
            <thead>
              <tr className="bg-gray-800 text-white uppercase text-sm leading-normal border border-gray-400">
                <th className="py-3 px-6 text-left font-bold border border-gray-400">Name</th>
                <th className="py-3 px-6 text-left font-bold border border-gray-400">Email</th>
                <th className="py-3 px-6 text-center font-bold border border-gray-400">Status</th>
                <th className="py-3 px-6 text-center font-bold border border-gray-400">Role</th>
                <th className="py-3 px-6 text-center font-bold border border-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-semibold">
            {users
                .filter((user) => user.username !== username) // Filtering while mapping
                .map((user) => (
                <tr key={user._id} className="border border-gray-300 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left border border-gray-300">{user.username}</td>
                  <td className="py-3 px-6 text-left border border-gray-300">{user.email}</td>
                  <td
                    className={`py-3 px-6 text-center font-bold border border-gray-300 ${
                      user.status === "active" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user.status}
                  </td>
                  {/* Role Dropdown */}
                  <td className="py-3 px-6 text-center border border-gray-300">
                    <select
                      className="border border-gray-400 p-2 rounded"
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-300">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600 transition me-3 mb-3"
                      onClick={() => handleSuspend(user._id, user.status)}
                    >
                      {user.status === "active" ? "Suspend" : "Reactivate"}
                    </button>
                    <button
                      className={`px-4 py-2 rounded transition ${
                        user.status === "suspended"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                      onClick={() => handleDelete(user._id, user.status)}
                      disabled={user.status === "suspended"}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
