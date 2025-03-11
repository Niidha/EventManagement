import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import UserNavbar from "./usernavbar";




const UpdateProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    toast.success("Profile updated successfully!");
    navigate("/user-dashboard");
  };

  return (
    <div>
 <UserNavbar/>
    <div className="flex justify-center items-center min-h-screen  p-4">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
        
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mt-1 bg-gray-200 rounded"
          required
        />
        
        <label className="block text-gray-700 mt-3">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 mt-1 bg-gray-200 rounded"
          required
        />

        <label className="block text-gray-700 mt-3">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mt-1 bg-gray-200 rounded"
          required
        />

        <label className="block text-gray-700 mt-3">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mt-1 bg-gray-200 rounded"
        />
        
        <button
          type="submit"
          className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
    </div>
  );
};

export default UpdateProfile;
